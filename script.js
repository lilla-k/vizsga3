const rootElement = document.getElementById("root");
const inputElement = document.createElement("input");
rootElement.appendChild(inputElement);
inputElement.id = "search-input";
inputElement.placeholder = "Search";
const loadingDiv = document.createElement("div");
rootElement.appendChild(loadingDiv);
loadingDiv.id="loading-div";
loadingDiv.textContent="Loading...";
const cardsContainer = document.createElement("div");
rootElement.appendChild(cardsContainer);
cardsContainer.id="grid-container";

async function getData(){
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    loadingDiv.style.display="none";
    console.log(data)
    data.map(obj => {
        const userCard = document.createElement("div");
        cardsContainer.appendChild(userCard);
        userCard.setAttribute("class", "card");
        const img = document.createElement("img");
        userCard.appendChild(img);
        img.src=obj.avatar_url;
        const nameElement = document.createElement("div");
        userCard.appendChild(nameElement);
        nameElement.setAttribute("class", "name");
        nameElement.textContent=obj.login;
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("class", "show-button");
        userCard.appendChild(buttonElement);
        buttonElement.textContent = "Show more";


    })
    
}

function init(){
    getData()
}

init();