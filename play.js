

let numberCards = document.getElementById('numbercards');
let collectionArr = JSON.parse(localStorage.getItem("collectionArr")) || [];
let cartes_container=document.getElementById('cartes-container')

numberCards.innerHTML = `<p>Deck (${collectionArr.length})</p>`;

function fetchCard(){
   collectionArr.forEach((c)=>{
    let div= document.createElement("div");

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
    })
}

fetchCard()



