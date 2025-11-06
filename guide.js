const slider_container = document.getElementById("slider-container");
async function fetchCard (){
    try {
        const res = await fetch("./cards.json");
        const data = await res.json();
        data.forEach((card)=>{
            const cardHtml = `
                <div id="card-${card.id}" class="min-w-[400px] h-[560px] bg-card-bg bg-center bg-contain bg-no-repeat flex flex-col justify-start relative">
                    <div class="bg-card-header bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[15vh] absolute top-0 left-4 flex justify-center items-center text-black">
                    <div class="bg-coin bg-center bg-contain bg-no-repeat w-[60px] h-[60px] absolute top-4 left-0 flex justify-center items-center text-black">
                        <p class="text-xs">${card.prix}</p>
                    </div>
                    <p>${card.name}</p>
                    </div>
                    <img class="mt-10 w-11/12 h-[40vh] mx-auto" src="${card.img}" alt="card-img">
                    <div class="bg-card-bar bg-center bg-contain bg-no-repeat w-[110%] h-[15vh] absolute top-[45%] left-[-5%]">
                    <p class="flex items-center justify-center text-black absolute top-1/3 left-10 mt-1">${card.name}</p>
                    </div>
                    <div class="bg-card-body bg-center bg-contain bg-no-repeat w-11/12 m-auto h-[70vh] flex flex-col justify-center gap-3 px-8">
                    <p class="text-[#6A624E]">${card.type}</p>
                    <p class="text-gray-400">${card.description}.</p>
                    </div>
                </div>
            `
            slider_container.innerHTML += cardHtml;
        })

        const gap = parseInt(window.getComputedStyle(slider_container).columnGap);
        const width = parseInt(window.getComputedStyle(slider_container.children[0]).width);
        

        let currentIndex = 0;

        setInterval(()=>{
            if(currentIndex <= data.length - 3){
                currentIndex+=3;
            }else{
                currentIndex = 0;
            }
            slider_container.style.transform = `translateX(-${currentIndex * (width + gap)}px)`;
        },2000)
    } catch (error) {
        console.error(error);
    }
}

fetchCard();