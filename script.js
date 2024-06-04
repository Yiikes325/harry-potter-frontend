const main = document.getElementById('main');
const character = document.querySelector('.character');
const searchInput = document.getElementById('search');

let characterArray = [];
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    characterArray.forEach((character) => {
        const isVisible = character.name.toLowerCase().includes(value);
        character.element.classList.toggle("hide", !isVisible);
    })
})
getCharacters();

function getCharacters() {
    fetch("https://potterhead-api.vercel.app/api/characters")
    .then(res => res.json())
    .then(data => {
        showCharacters(data);
    })
}

function showCharacters(data) {
    main.innerHTML = '';

    characterArray = data.map(character => {
        const {name, image} = character;
        const characterElement = document.createElement('div');
        characterElement.classList.add('character');
        characterElement.classList.add('front');
        characterElement.innerHTML = `
        <img src = "${image}" alt = ${name}"
        oneerror = "handleError(this); "/>
        <div class = "character-info">
        <h3>${name}</h3>
        </div>
        `

        const characterBack = document.createElement('div');
        characterBack.classList.add('character');
        characterBack.classList.add('back');
        characterBack.innerHTML = `
        <h1>Back of the card</h1>`
        main.appendChild(characterElement);
        main.appendChild(characterBack);

        return {name:character.name, element:characterElement};
    });
}

function handleError(imgElement) {
    imgElement.width = "100%";
    imgElement.height = "90%;"
    imgElement.src = "images/wizard-icon.jpeg";
}