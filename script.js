const rootElement = document.getElementById("root");
const inputElement = document.createElement("input");
rootElement.appendChild(inputElement);
inputElement.id = "search-input";
inputElement.placeholder = "Search";
const loadingDiv = document.createElement("div");
rootElement.appendChild(loadingDiv);
loadingDiv.id = "loading-div";
loadingDiv.textContent = "Loading...";
const cardsContainer = document.createElement("div");
rootElement.appendChild(cardsContainer);
cardsContainer.id = "grid-container";
const filteredName = inputElement.value;
const errorDiv = document.createElement("div");
rootElement.appendChild(errorDiv);



async function getData() {
    const response = await fetch("https://api.github.com/users");
    loadingDiv.style.display = "none";
    return users = await response.json();
}

function renderUsers(users){
    users.map(obj => {
        const userCard = document.createElement("div");
        cardsContainer.appendChild(userCard);
        userCard.setAttribute("class", "card");
        const img = document.createElement("img");
        userCard.appendChild(img);
        img.src = obj.avatar_url;
        const nameElement = document.createElement("div");
        userCard.appendChild(nameElement);
        nameElement.setAttribute("class", "name");
        nameElement.textContent = obj.login;
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("class", "show-button");
        userCard.appendChild(buttonElement);
        buttonElement.textContent = "Show more";
        const rankElement = document.createElement("div");
        userCard.appendChild(rankElement);
        rankElement.textContent = "Rank: User";
        rankElement.style.display = "none";
        const adminElement = document.createElement("div");
        userCard.appendChild(adminElement);
        adminElement.textContent = "Admin: False";
        adminElement.style.display = "none";


        buttonElement.addEventListener("click", function onShowButton() {

            if (buttonElement.textContent === "Show more") {
                buttonElement.textContent = "Show less";
                rankElement.style.display = "block";
                adminElement.style.display = "block";
            }
            else if (buttonElement.textContent === "Show less") {
                buttonElement.textContent = "Show more";
                rankElement.style.display = "none";
                adminElement.style.display = "none";
            }
        })
    })
}

async function init() {
    const users = await getData()
    renderUsers(users);
}

init();

async function onSearch(event){
    const users = await getData();
    const filteredUsers = users.filter(obj => obj.login.startsWith(event.target.value));
    if (filteredUsers.length===0){
        errorDiv.textContent = "Nothing found";
    }
    resetUsers();
    renderUsers(filteredUsers);
}

inputElement.addEventListener("keyup", onSearch);

function resetUsers(){
    console.log(cardsContainer);
    cardsContainer.innerHTML="";
}