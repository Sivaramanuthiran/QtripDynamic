import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const adventureId=urlParams.get("adventure");
  return adventureId;


  // Place holder for functionality to work in the Stubs
 
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const adv = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    const advData= await adv.json();
    return advData;
  }
  catch(e){
    return null;
  }
   
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
 document.getElementById("adventure-name").innerHTML=adventure.name;
 document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
 document.getElementById("adventure-content").innerHTML=adventure.content;
 addBootstrapPhotoGallery(adventure.images)
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let slides=""
  let indicator=""
  images.forEach((imageUrl,index)=>{const activeClass=index==0 ? "active" : ""
slides+=`
         <div class="carousel-item ${activeClass}">
          <img src=${imageUrl} alt="" class="activity-card-image pb-3 pb-md-0" />
         </div>`
indicator += `
        <button type="button" data-bs-target="#cariuselExampleIndicators" ${index === 0 ? 'class="active" aria-current="true"' : ''}
        data-bs-slide-to="${index}" aria-label="slide ${index+1}"></button>`        
        });

 document.getElementById("photo-gallery").innerHTML=`<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
 <div class="carousel-indicators">${indicator}</div>
 <div class="carousel-inner">${slides}</div>
 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Previous</span>
 </button>
 <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Next</span>
 </button>
</div>`       

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
   }
   else{
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
   }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent=adventure.costPerHead * persons; 
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  document.getElementById('myForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formElems =e.target.elements
    const formData={
      adventure:adventure.id,
      name:formElems.name.value,
      date:formElems.date.value,
      persons: formElems.persons.value,
    }
    let response = await fetch(config.backendEndpoint +`/reservation/new`,{method:'POST',
  headers:{'content-Type':'application/json'},
  body:JSON.stringify(formData),});
  let result =await response.json();
  if(result.success) alert('Success!');
  else alert('Failed');
});
  
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
   if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
   }
   else
   {
    document.getElementById("reserved-banner").style.display="none";
   }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
