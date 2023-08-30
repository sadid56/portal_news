const loadNewsTab = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const news = data.data.news_category;
    displyNewsTab(news)
}
const displyNewsTab = news =>{
//console.log(news)
    const tabContainer = document.getElementById('tap-container');
   news.forEach(categories => {
    const div = document.createElement('div');
        div.innerHTML = `
        <a onclick=newsLoad('${categories.category_id}') class="tab">${categories.category_name
        }</a>
        `;
        tabContainer.appendChild(div)
    //console.log(categories)
   });
}
const newsLoad = async(categoryId)=>{
   // console.log(categoryId)
   toggleLoadingSnipper(true)
    const res = await fetch( `https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    //console.log(data.data)
    const news = data.data;
    //console.log(news)

    const cardContaier = document.getElementById('card-container');
    cardContaier.innerHTML = '';
    news.forEach(categorie =>{
        console.log(categorie)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded bg-base-200">
        <div class="">
            <img src="${categorie.image_url}" class="w-full rounded-lg " />
            <div class="mt-5 px-5">
            <h1 class="text-3xl  md:text-5xl font-bold">${categorie.title}</h1>
            <p class="py-6">${categorie.details}</p>
            <hr>
            <div class="flex items-center gap-3 justify-between md:p-5">  
            <div class="flex items-center">
                <img class="w-10 h-10 rounded-full mr-4" src="${categorie.author.img}">
                <div class="text-sm">
                  <p class="text-gray-900 leading-none">${categorie.author.name}</p>
                  <p class="text-gray-600">${categorie.author.published_date
                  }</p>
                </div>
              </div>
              <div class="flex items-center gap-1">
                  <i class="fa-solid fa-eye"></i>
                  <h3 class="font-bold">${categorie.total_view? categorie.total_view: 'No Viwes'
                  }</h3>

              </div>
              <div class="flex gap-1 items-center">
              <i class="fa-solid fa-star"></i>
                <h2 class="font-bold">${categorie.rating.number}</h2>
              </div>
              <div>
                <button>
                    <i class="fa-solid fa-arrow-right-long text-blue-600 text-xl"></i>
                </button>
              </div>
    </div>
            </div>
        </div>
        </div>
        `;
        cardContaier.appendChild(div)
    })
 toggleLoadingSnipper(false)
}
const toggleLoadingSnipper = (isLoading) =>{
    const loadingSpiner = document.getElementById('loading-sniper');
    if(isLoading){
        loadingSpiner.classList.remove('hidden')
    }
    else{
        loadingSpiner.classList.add('hidden')
    }
}

newsLoad('01')
 loadNewsTab()