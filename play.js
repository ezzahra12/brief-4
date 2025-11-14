let numberCards = document.getElementById("numbercards");
let collectionArr = JSON.parse(localStorage.getItem("collectionArr") || "[]");
let cartes_container = document.getElementById("cartes-container");
let choose_btn = document.getElementById("choosebtn");
let main_container = document.getElementById("main-container");
let mainPlayZone = document.getElementById("mainPlayZone");
let end_turn = document.getElementById("end-turn")
let ai_cards = Array.from(document.querySelectorAll(".ai-card"));
let ai_hand = document.getElementById("ai-hand");
numberCards.innerHTML = `<p>Deck (${collectionArr.length})</p>`;

async function fetchCard() {
  try {
    collectionArr.forEach((c) => {
      const div = document.createElement("div");
      div.classList.add("card-item");

      div.innerHTML = `
        <div class="w-full h-auto bg-card-bg bg-center bg-no-repeat flex flex-col justify-start relative">
            <div class="bg-card-header bg-center bg-contain bg-no-repeat w-auto m-auto absolute top-0 left-4 flex justify-center items-center text-black">
                <p>${c.name}</p>
            </div>
            <img class="mt-10 h-[15vh] w-auto mx-auto" src="${c.img}" alt="card-img">
        </div>`;
        
     div.querySelector("img").setAttribute("draggable", false)

      cartes_container.append(div);

      div.addEventListener("dragstart", () => {
        draggedItem = div;
        div.classList.add("opacity-[0.5]");
      });

      div.addEventListener("dragend", () => {
        div.classList.remove("opacity-[0.5]");
      });
    });
  } catch (error) {
    console.error(error);
  }
}

fetchCard();

let draggedItem = null;

function randomcards(Arr, count = 0) {
  let collcopy = [...Arr].sort(() => 0.5 - Math.random());
  return collcopy.slice(0, count);
}

function fillContainers() {
  main_container.innerHTML = "";
  let randomCard = randomcards(collectionArr, 5);

  randomCard.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("card-item");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <div class="w-[100px] h-[140px] bg-card-bg bg-center bg-no-repeat flex flex-col justify-start relative">
            <div class="bg-card-header bg-center bg-contain bg-no-repeat w-auto m-auto absolute top-0 left-4 flex justify-center items-center text-black">
                <p>${c.name}</p>
            </div>
            <img class="w-full h-full" src="${c.img}" alt="card-img">
        </div>`;
  
     div.querySelector("img").setAttribute("draggable", false)

    main_container.append(div);

    div.addEventListener("dragstart", () => {
      draggedItem = div;
      div.classList.add("opacity-[0.5]");
    });

    div.addEventListener("dragend", () => {
      div.classList.remove("opacity-[0.5]");
    });
  });
}

const slots = document.querySelectorAll(".slot");

const aiCardArr = randomcards(collectionArr, 5);
const aiChoices = ["attack", "defend"]
let aiSlotIndex = 0;


function endTurn(){
    let index = Math.floor(Math.random() * aiCardArr.length);
    let choice = aiChoices[Math.floor(Math.random() * 2)]

    card = aiCardArr.splice(index,1);
    const div = document.createElement("div");
    div.classList.add("card-item");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <div class="w-[100px] h-[140px] bg-card-bg bg-center bg-no-repeat flex flex-col justify-start relative">
            <div class="bg-card-header bg-center bg-contain bg-no-repeat w-auto m-auto absolute top-0 left-4 flex justify-center items-center text-black">
                <p>${card[0].name}</p>
            </div>
            <img class="w-full h-full" src="${card[0].img}" alt="card-img">
        </div>`;
  
     div.querySelector("img").setAttribute("draggable", false)
    
    ai_cards[aiSlotIndex].append(div)

    if(choice === "defend"){
      ai_cards[aiSlotIndex].style.transform = "rotate(90deg)";
      ai_cards[aiSlotIndex].style.transition = "transform 0.5s";
    }

    document.getElementById("aiPlayZone").classList.add("gap-x-6");

    aiSlotIndex++;

    ai_hand.textContent = aiCardArr.length

    main_container.querySelectorAll(".card-item").forEach(card => {
        card.setAttribute("draggable", true);
    })

    end_turn.removeEventListener("click", endTurn)

}

slots.forEach((slot) => {
  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedItem) return;

    slot.innerHTML = "";
    slot.classList.remove("slot");

    // ajouter boutons
    const actions = document.createElement("div");
    actions.innerHTML = `
        <div class="flex justify-center items-center gap-6">
            <button class="attack bg-slate-200 text-black p-4 rounded text-xs font-bold border border-[#61D1FF]">⚔️ Attaque</button>
            <button class="defend bg-black text-[#61D1FF] p-4 rounded text-xs font-bold border border-[#61D1FF]">🛡️ Défense</button>
        </div>`;
    slot.appendChild(actions);

    const attackBtn = actions.querySelector(".attack");
    const defendBtn = actions.querySelector(".defend");

    attackBtn.addEventListener("click", () => {
      slot.appendChild(draggedItem);
      actions.remove();
      slot.setAttribute("role", "attacker");
      draggedItem = null;
    });

    defendBtn.addEventListener("click", () => {
      slot.appendChild(draggedItem);
      actions.remove();
      slot.setAttribute("role", "defender");
      slot.style.transform = "rotate(90deg)";
      slot.style.transition = "transform 0.5s";
      mainPlayZone.classList.remove();

      mainPlayZone.classList.add("gap-x-6");

      draggedItem = null;
    });

    main_container.querySelectorAll(".card-item").forEach(card => {
        card.setAttribute("draggable", false);
    })

    end_turn.addEventListener("click", endTurn)
  });
});

const clickHandler = () => {
  if (collectionArr.length < 5) {
    console.warn("pas assez de cartes dans la collection");
    return;
  }
  fillContainers();
  choose_btn.removeEventListener("click", clickHandler)
}

choose_btn.addEventListener("click", clickHandler);
