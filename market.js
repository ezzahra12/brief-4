const market_container = document.getElementById("market-container");
let cartArr = JSON.parse(localStorage.getItem('cartArr')) || [];
let favoriteArr = JSON.parse(localStorage.getItem('favoriteArr')) || [];

console.log(favoriteArr)

function getHtml(card){
    let inFavorites = favoriteArr.find((c) => c.id === card.id);
    let inCart = cartArr.find((c) => c.id === card.id);

    let div = document.createElement('div');
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
            <img class="mt-10 h-[40vh] w-11/12 mx-auto" src="${card.img}" alt="card-img">
            <div class="bg-card-bar bg-center bg-contain bg-no-repeat w-[110%] h-[15vh] absolute top-[45%] left-[-5%]">
                <p class="flex items-center justify-center text-black absolute top-1/3 left-10 mt-1">${card.type}</p>
            </div>
            <div class="bg-card-body bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[70vh] flex flex-col justify-center gap-3 px-8">
                <p class="text-[#6A624E]">${card.name}</p>
                <p class="text-gray-400">${card.description}</p>
            </div>
            </div>
            <div class=" flex flex-row justify-around py-5">
                ${
                    inFavorites ? `<button id="remove-favorite-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove Fav</button>`
                    : `<button id="add-favorite-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Favorite</button>`
                }
                ${
                    inCart ? `<button id="remove-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove From Cart</button>`
                    : `<button id="add-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Add To Cart</button>`
                }
            </div>
    `
    div.innerHTML = html;
    let favoritBtn, cartBtn;
    if(inFavorites){
        favoritBtn = div.querySelector(`#remove-favorite-${card.id}`);
        favoritBtn.addEventListener("click", ()=>{
            removeFromFavorites(card, favoritBtn);
        })
    }else{
        favoritBtn = div.querySelector(`#add-favorite-${card.id}`);
        favoritBtn.addEventListener("click", ()=>{
            addToFavorites(card, favoritBtn);
        })
    }

    if(inCart){
        cartBtn = div.querySelector(`#remove-to-cart-${card.id}`);
        cartBtn.addEventListener("click", ()=>{
            removeFromCart(card, cartBtn);
        })
    }else{
        cartBtn = div.querySelector(`#add-to-cart-${card.id}`);
        cartBtn.addEventListener("click", ()=>{
            addToCart(card, cartBtn);
        })
    }
    

    return div;
}

function removeColorFromTypeBtn(){
    let btns = document.querySelectorAll(".type-btn")
    btns.forEach((btn)=>{
        btn.classList.remove("text-[#c9c39c70]")
    })
}

function removeFromFavorites(card, favoritBtn){
    favoriteArr = favoriteArr.filter((c) => c.id !== card.id);
    localStorage.setItem('favoriteArr', JSON.stringify(favoriteArr))
    favoritBtn.outerHTML = `<button id="add-favorite-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Favorite</button>`
    favoritBtn = document.getElementById(`add-favorite-${card.id}`);
    favoritBtn.addEventListener("click", ()=>{
        addToFavorites(card, favoritBtn);
    })
}

function removeFromCart(card, cartBtn){
    cartArr = cartArr.filter((c) => c.id !== card.id);
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
    cartBtn.outerHTML = `<button id="add-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Add To Cart</button>`
    cartBtn = document.getElementById(`add-to-cart-${card.id}`);
    cartBtn.addEventListener("click", ()=>{
        addToCart(card, cartBtn);
    })
}

function addToFavorites(card, favoritBtn){
    favoriteArr.push(card);
    localStorage.setItem('favoriteArr', JSON.stringify(favoriteArr))
    favoritBtn.outerHTML = `<button id="remove-favorite-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove Fav</button>`
    favoritBtn = document.getElementById(`remove-favorite-${card.id}`);
    favoritBtn.addEventListener("click", ()=>{
        removeFromFavorites(card, favoritBtn);
    })
}

function addToCart(card, cartBtn) {
    card.quantity = 1;
    cartArr.push(card);
    localStorage.setItem('cartArr', JSON.stringify(cartArr))
    cartBtn.outerHTML = `<button id="remove-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove From Cart</button>`
    cartBtn = document.getElementById(`remove-to-cart-${card.id}`);
    cartBtn.addEventListener("click", ()=>{
        removeFromCart(card, cartBtn);
    })
}

async function fetchCard (){
    try {
        const res = await fetch("./cards.json");
        const data = await res.json();
        data.forEach((card)=>{
            if(card.type === "Mythic"){
                const cardHtml = getHtml(card)
                market_container.append(cardHtml);
            }
        })

        const mythic = document.getElementById("mythic");
        const legendar = document.getElementById("legendar");
        const rare = document.getElementById("rare");
        const common = document.getElementById("common");

        mythic.addEventListener("click", ()=>{
            market_container.innerHTML = "";
            removeColorFromTypeBtn();
            mythic.classList.add("text-[#c9c39c70]")
            data.forEach((card)=>{
                if(card.type === "Mythic"){
                    const cardHtml = getHtml(card)
                    market_container.append(cardHtml);
                }
            })
        })

        legendar.addEventListener("click", ()=>{
            market_container.innerHTML = "";
            removeColorFromTypeBtn();
            legendar.classList.add("text-[#c9c39c70]")
            data.forEach((card)=>{
                if(card.type === "Legendar"){
                    const cardHtml = getHtml(card)
                    market_container.append(cardHtml);
                }
            })
        })

        rare.addEventListener("click", ()=>{
            market_container.innerHTML = "";
            removeColorFromTypeBtn();
            rare.classList.add("text-[#c9c39c70]")
            data.forEach((card)=>{
                if(card.type === "Rare"){
                    const cardHtml = getHtml(card)
                    market_container.append(cardHtml);
                }
            })
        })

        common.addEventListener("click", ()=>{
            market_container.innerHTML = "";
            removeColorFromTypeBtn();
            common.classList.add("text-[#c9c39c70]")
            data.forEach((card)=>{
                if(card.type === "Common"){
                    const cardHtml = getHtml(card)
                    market_container.append(cardHtml);
                }
            })
        })

    } catch (error) {
        console.error(error);
    }
}

fetchCard();