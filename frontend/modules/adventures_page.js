
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  const city=urlParams.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const result = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    const data= await result.json();
    return data;
  }
  catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) =>{
  const ele=document.createElement("div");
  ele.className="col-6 col-lg-3 mb-4";
  ele.innerHTML=`
      <a href="detail/?adventure=${key.id}" id=${key.id}>
       <div class="activity-card">
        <div class="category-banner">${key.category}</div>
          <img class="img-responsive"
            src=${key.image}
          />
            <div class="activity-card-text text-md-center w-100 mt-3 px-2">
             <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
               <h5 class="text-left">${key.name}</h5>
               <p>${key.costPerHead}</p>
             </div>
             <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"> 
                <h5 class="text-left">Duration</h5>
                <p>${key.duration}</p>
             </div>
            </div>
        </div>
      </a>          


  
  `;
 document.getElementById("data").appendChild(ele);
  
});

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 const filteredDuration = list.filter(adventure =>{ if(adventure.duration >= low && adventure.duration <= high){return true;}
});
 return filteredDuration;
 
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
   const filteredCategory = list.filter((adventure) => categoryList.includes(adventure.category));
   return filteredCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
     let splitduration= filters.duration.split("-");
     let d1=splitduration[0]; 
     let d2=splitduration[1];
     if(filters.duration.length>0 && filters.category.length>0){
      list= filterByDuration(list,d1,d2);
      list=filterByCategory (list,filters.category);
     }
     else if(filters.duration.length>0){
      list=filterByDuration(list,parseInt(d1),parseInt(d2));
     }
     else if(filters.category.length>0){
      list=filterByCategory(list,filters.category);
     }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
 
   localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

   const stock = localStorage.getItem("filters");
   
  // Place holder for functionality to work in the Stubs
  return JSON.parse(stock);
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters["category"];
  let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
    li.push(categoryList[i]);
  }
  for(let i=0;i<li.length;i++)
  {
  
  var div=document.createElement("div");
  div.setAttribute("class" ,"category-filter");
  div.innerText=li[i];
  document.getElementById("category-list").append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
