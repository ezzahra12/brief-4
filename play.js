let numberCards = document.getElementById('numbercards');
let collectionArr = JSON.parse(localStorage.getItem("collectionArr")) || [];
let cartes_container=document.getElementById('cartes-container')
let choose_btn=document.getElementById("choosebtn")
let main_container=document.getElementById("main-container")
numberCards.innerHTML = `<p>Deck (${collectionArr.length})</p>`;

function randomcards(Arr, count=0){
    let collcopy=[...Arr].sort(()=>0.5 - Math.random());
    return collcopy.slice(0,count);
}

let draggedItem=null;
function fillContainers(){
    const main_container=document.getElementById("main-container");
    main_container.innerHTML="";
    let randomCard=randomcards(collectionArr,5);
    randomCard.forEach((c)=>{
        const div=document.createElement("div");
         div.classList.add("card-item");
          div.setAttribute("draggable", "true");

        div.innerHTML=` 
           <div class="w-full h-auto
 bg-card-bg bg-center bg-no-repeat flex flex-col justify-start relative" draggable="true">
            <div class="bg-card-header bg-center bg-contain bg-no-repeat w-auto m-auto absolute top-0 left-4 flex justify-center items-center text-black">
                
                <p>${c.name}</p>
            </div>
            <img class="mt-10 h-[15vh] w-auto mx-auto" src="${
              c.img
            }" alt="card-img">
               
    `;
    main_container.append(div);
    div.addEventListener('dragstart', (e)=>{
    draggedItem=div;
    div.classList.add('opacity-[0.5]');
  });
  div.addEventListener('dragend', () => {
    div.classList.remove('opacity-[0.5]');
  });
  });
  }
const slots = document.querySelectorAll(".slot");

slots.forEach(slot => {

  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  slot.addEventListener("drop", (e) => {
    e.preventDefault();

    if (draggedItem) {

      slot.innerHTML = "";        
      slot.classList.remove("slot");
      slot.classList.add("filled-slot");

      slot.appendChild(draggedItem);  

      draggedItem = null;
    }
  });

});


choose_btn.addEventListener("click", ()=>{
  if(collectionArr.length<5){
    console.warn("pas assez de cartes dans la collection")
     }
  else{
        fillContainers();
    }
        
   
 
  


} );
function fetchCard(){
   collectionArr.forEach((c)=>{
    let div=document.createElement("div");

    div.className=`carte-${c.id}`
    const html=` <div class="w-full h-auto
 bg-card-bg bg-center bg-no-repeat flex flex-col justify-start relative">
            <div class="bg-card-header bg-center bg-contain bg-no-repeat w-auto m-auto absolute top-0 left-4 flex justify-center items-center text-black">
                
                <p>${c.name}</p>
            </div>
            <img class="mt-10 h-[15vh] w-auto mx-auto" src="${
              c.img
            }" alt="card-img">
            
               
    `
    div.innerHTML=html;
    cartes_container.append(div);

div.addEventListener('dragstart', (e)=>{
    dragge
})

    })
}

fetchCard()



