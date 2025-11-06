const collection_container = document.getElementById("collection-container");
let collectionArr = JSON.parse(localStorage.getItem("collectionArr")) || [];

console.log(collectionArr);

function getHtml(card) {
  let div = document.createElement("div");
  div.className = "w-[400px] min-h-[560px]";
  div.id = `card-${card.id}`;
  const html = `
        <div class="w-[400px] h-[560px] bg-card-bg bg-center bg-contain bg-no-repeat flex flex-col justify-start relative">
            <div class="bg-card-header bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[15vh] absolute top-0 left-4 flex justify-center items-center text-black">
                <div class="bg-coin bg-center bg-contain bg-no-repeat w-[60px] h-[60px] absolute top-4 left-0 flex justify-center items-center text-black">
                    <p class="text-xs">${card.prix}</p>
                </div>
                <p>${card.name}</p>
            </div>
            <img class="mt-10 h-[40vh] w-11/12 mx-auto" src="${
              card.img
            }" alt="card-img">
            <div class="bg-card-bar bg-center bg-contain bg-no-repeat w-[110%] h-[15vh] absolute top-[45%] left-[-5%]">
                <p class="flex items-center justify-center text-black absolute top-1/3 left-10 mt-1">${
                  card.type
                }</p>
            </div>
            <div class="bg-card-body bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[70vh] flex flex-col justify-center gap-3 px-8">
                <p class="text-[#6A624E]">Quantity: ${card.quantity}</p>
                <p class="text-gray-400">${card.description}</p>
            </div>
            </div>
    `;
  div.innerHTML = html;
  return div;
}

function removeColorFromTypeBtn() {
  let btns = document.querySelectorAll(".type-btn");
  btns.forEach((btn) => {
    btn.classList.remove("text-[#c9c39c70]");
  });
}

function fetchCard() {
  if (collectionArr.length > 0) {
    collectionArr.forEach((card) => {
      if (card.type === "Mythic") {
        const cardHtml = getHtml(card);
        collection_container.append(cardHtml);
      }
    });

    const mythic = document.getElementById("mythic");
    const legendar = document.getElementById("legendar");
    const rare = document.getElementById("rare");
    const common = document.getElementById("common");

    mythic.addEventListener("click", () => {
      collection_container.innerHTML = "";
      removeColorFromTypeBtn();
      mythic.classList.add("text-[#c9c39c70]");
      let cardCount = 0;
      collectionArr.forEach((card) => {
        if (card.type === "Mythic") {
          const cardHtml = getHtml(card);
          collection_container.append(cardHtml);
          cardCount++;
        }
      });
      if (cardCount === 0) {
        collection_container.innerHTML = `<p>Nothing in the Collection</p>`;
      }
    });

    legendar.addEventListener("click", () => {
      collection_container.innerHTML = "";
      removeColorFromTypeBtn();
      legendar.classList.add("text-[#c9c39c70]");
      let cardCount = 0;
      collectionArr.forEach((card) => {
        if (card.type === "Legendar") {
          cardCount++;
          const cardHtml = getHtml(card);
          collection_container.append(cardHtml);
        }
      });
      if (cardCount === 0) {
        collection_container.innerHTML = `<p>Nothing in the Collection</p>`;
      }
    });

    rare.addEventListener("click", () => {
      collection_container.innerHTML = "";
      removeColorFromTypeBtn();
      rare.classList.add("text-[#c9c39c70]");
      let cardCount = 0;
      collectionArr.forEach((card) => {
        if (card.type === "Rare") {
          cardCount++;
          const cardHtml = getHtml(card);
          collection_container.append(cardHtml);
        }
      });
      if (cardCount === 0) {
        collection_container.innerHTML = `<p>Nothing in the Collection</p>`;
      }
    });

    common.addEventListener("click", () => {
      collection_container.innerHTML = "";
      removeColorFromTypeBtn();
      common.classList.add("text-[#c9c39c70]");
      let cardCount = 0;
      collectionArr.forEach((card) => {
        if (card.type === "Common") {
          cardCount++;
          const cardHtml = getHtml(card);
          collection_container.append(cardHtml);
        }
      });
      if (cardCount === 0) {
        collection_container.innerHTML = `<p>Nothing in the Collection</p>`;
      }
    });
  } else {
    collection_container.innerHTML = `<p>Nothing in the Collection</p>`;
  }
}

fetchCard();