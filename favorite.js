const favorite_container = document.getElementById("favorite-container");
let cartArr = JSON.parse(localStorage.getItem('cartArr')) || [];
let favoriteArr = JSON.parse(localStorage.getItem('favoriteArr')) || [];

console.log(favoriteArr)

function getHtml(card){
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
                <button id="remove-favorite-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove Fav</button>
                ${
                    inCart ? `<button id="remove-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove From Cart</button>`
                    : `<button id="add-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Add To Cart</button>`
                }
            </div>
    `
    div.innerHTML = html;
    let favoritBtn, cartBtn;
    favoritBtn = div.querySelector(`#remove-favorite-${card.id}`);
    favoritBtn.addEventListener("click", ()=>{
        removeFromFavorites(card, favoritBtn);
    })

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
    let cardDiv = document.getElementById(`card-${card.id}`)
    cardDiv.remove();
    if(favoriteArr.length <= 0 ){
        favorite_container.innerHTML = `<p>Nothing in the Favorites</p>`
    }
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

function addToCart(card, cartBtn){
    cartArr.push(card);
    localStorage.setItem('cartArr', JSON.stringify(cartArr))
    cartBtn.outerHTML = `<button id="remove-to-cart-${card.id}" class="bg-[#C9C39C] text-black text-sm py-4 px-6 rounded-xl">Remove From Cart</button>`
    cartBtn = document.getElementById(`remove-to-cart-${card.id}`);
    cartBtn.addEventListener("click", ()=>{
        removeFromCart(card, cartBtn);
    })
}

function fetchCard (){
    if(favoriteArr.length > 0){
        favoriteArr.forEach((card)=>{
            if(card.type === "Mythic"){
                const cardHtml = getHtml(card)
                favorite_container.append(cardHtml);
            }
        })

        const mythic = document.getElementById("mythic");
        const legendar = document.getElementById("legendar");
        const rare = document.getElementById("rare");
        const common = document.getElementById("common");

        mythic.addEventListener("click", ()=>{
            favorite_container.innerHTML = "";
            removeColorFromTypeBtn();
            mythic.classList.add("text-[#c9c39c70]")
            let cardCount = 0;
            favoriteArr.forEach((card)=>{
                if(card.type === "Mythic"){
                    const cardHtml = getHtml(card)
                    favorite_container.append(cardHtml);
                    cardCount++;
                }
            })
            if(cardCount === 0){
                favorite_container.innerHTML = `<p>Nothing in the Favorites</p>`
            }
        })

        legendar.addEventListener("click", ()=>{
            favorite_container.innerHTML = "";
            removeColorFromTypeBtn();
            legendar.classList.add("text-[#c9c39c70]")
            let cardCount = 0;
            favoriteArr.forEach((card)=>{
                if(card.type === "Legendar"){
                    cardCount++;
                    const cardHtml = getHtml(card)
                    favorite_container.append(cardHtml);
                }
            })
            if(cardCount === 0){
                favorite_container.innerHTML = `<p>Nothing in the Favorites</p>`
            }
        })

        rare.addEventListener("click", ()=>{
            favorite_container.innerHTML = "";
            removeColorFromTypeBtn();
            rare.classList.add("text-[#c9c39c70]")
            let cardCount = 0;
            favoriteArr.forEach((card)=>{
                if(card.type === "Rare"){
                    cardCount++;
                    const cardHtml = getHtml(card)
                    favorite_container.append(cardHtml);
                }
            })
            if(cardCount === 0){
                favorite_container.innerHTML = `<p>Nothing in the Favorites</p>`
            }
        })

        common.addEventListener("click", ()=>{
            favorite_container.innerHTML = "";
            removeColorFromTypeBtn();
            common.classList.add("text-[#c9c39c70]")
            let cardCount = 0;
            favoriteArr.forEach((card)=>{
                if(card.type === "Common"){
                    cardCount++;
                    const cardHtml = getHtml(card)
                    favorite_container.append(cardHtml);
                }
            })
            if(cardCount === 0){
                favorite_container.innerHTML = `<p>Nothing in the Favorites</p>`
            }
        })
    }else{
        favorite_container.innerHTML = `<p>Nothing in the Favorites</p>`
    }
}

fetchCard();