const cart_container = document.getElementById("cart-container");
let cartArr = JSON.parse(localStorage.getItem("cartArr")) || [];
let collectionArr = JSON.parse(localStorage.getItem("collectionArr")) || [];

function calculateTotal() {
  let total = 0;
  cartArr.forEach((card) => {
    total += card.prix.slice(0, -1) * card.quantity;
  });
  let totalElement = document.getElementById("total");
  totalElement.textContent = total + "$";
}

function getHtml(card) {
  let div = document.createElement("div");
  div.className = "w-full bg-[#C9C39C] mt-10 text-black";
  div.id = `card-${card.id}`;
  const html = `
        <h1 class="text-center">${card.name}</h1>
      <div class="flex justify-around">
        <div
          class="w-[400px] h-[560px] bg-card-bg bg-center bg-contain bg-no-repeat flex flex-col justify-start relative"
        >
          <div
            class="bg-card-header bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[15vh] absolute top-0 left-4 flex justify-center items-center text-black"
          >
            <div
              class="bg-coin bg-center bg-contain bg-no-repeat w-[60px] h-[60px] absolute top-4 left-0 flex justify-center items-center text-black"
            >
              <p class="text-xs">24$</p>
            </div>
            <p>${card.name}</p>
          </div>
          <img
            class="mt-10 h-[40vh] w-11/12 mx-auto"
            src="${card.img}"
            alt="card-img"
          />
          <div
            class="bg-card-bar bg-center bg-contain bg-no-repeat w-[110%] h-[15vh] absolute top-[45%] left-[-5%]"
          >
            <p
              class="flex items-center justify-center text-black absolute top-1/3 left-10 mt-1"
            >
              ${card.type}
            </p>
          </div>
          <div
            class="bg-card-body bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[70vh] flex flex-col justify-center gap-3 px-8"
          >
            <p class="text-[#6A624E]">${card.name}</p>
            <p class="text-gray-400">
              ${card.description}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-y-10">
          <h3 class="text-center" style="margin-top: 20vh">quantity</h3>
          <div class="flex">
            <button id="plus-${card.id}" class="bg-blue-950 px-5 text-white rounded-xl">
              +
            </button>
            <p id="quantity-${card.id}" class="mx-2">${card.quantity}</p>
            <button id="minus-${card.id}" class="bg-blue-950 px-5 text-white rounded-xl">
              -
            </button>
          </div>
          <button id="remove-to-cart-${card.id}"
            class="bg-blue-950 rounded-xl text-white"
            style="width: 100px; height: 30px"
          >
            REMOVE
          </button>
        </div>

        <div></div>
      </div>
    `;
  div.innerHTML = html;

  cartBtn = div.querySelector(`#remove-to-cart-${card.id}`);
  cartBtn.addEventListener("click", () => {
    removeFromCart(card);
  });

  const plusBtn = div.querySelector(`#plus-${card.id}`);
  const minusBtn = div.querySelector(`#minus-${card.id}`);
  const quantity = div.querySelector(`#quantity-${card.id}`);

  plusBtn.addEventListener("click", () => {
    card.quantity += 1;
    quantity.innerHTML = card.quantity;
    localStorage.setItem("cartArr", JSON.stringify(cartArr));
    calculateTotal();
  });

  minusBtn.addEventListener("click", () => {
    if (card.quantity > 1) {
      card.quantity -= 1;
      quantity.innerHTML = card.quantity;
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
      calculateTotal();
    }
  });

  return div;
}

function removeFromCart(card) {
  cartArr = cartArr.filter((c) => c.id !== card.id);
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
  cardDiv = document.getElementById(`card-${card.id}`);
  cardDiv.remove();
  if (cartArr.length <= 0) {
    cart_container.innerHTML = `<p>Nothing in the Cart</p>`;
  }
}

function fetchCard() {
  if (cartArr.length > 0) {
    cartArr.forEach((card) => {
      const cardHtml = getHtml(card);
      cart_container.append(cardHtml);
    });
    calculateTotal();

    let clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
      cartArr = [];
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
      cart_container.innerHTML = `<p>Nothing in the Cart</p>`;
      calculateTotal();
    });

    let orderBtn = document.getElementById("order");
      orderBtn.addEventListener("click", () => {
        
      cartArr.forEach((card) => {
        const collectionCard = collectionArr.find((c) => c.id === card.id);
        if (collectionCard) {
          collectionCard.quantity += card.quantity;
        } else {
          collectionArr.push(card);
        }
      });
        
      localStorage.setItem("collectionArr", JSON.stringify(collectionArr));
      cartArr = [];
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
      cart_container.innerHTML = `<p>Nothing in the Cart</p>`;
      calculateTotal();
    });
  } else {
    cart_container.innerHTML = `<p>Nothing in the Cart</p>`;
  }
}

fetchCard();
