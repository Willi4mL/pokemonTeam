import { pokemonUrl } from "./fetch.js"

const findChampionButton = document.querySelector('#findChampion')
const myTeamButton = document.querySelector('#myTeam')
const searchPokemonNav = document.querySelector('#contentSearch')
const searchPokemonInput = document.querySelector('#searchChampion')
const cardContainer = document.querySelector('#pokemonCardList')
const reserveSection = document.querySelector('#reserveSection')
const myTeamSection = document.querySelector('#myTeamSection')
const myTeamDivCard = document.querySelector('#myTeamDivCard')
const myReserveDivCard = document.querySelector('#myReserveDivCard')
const myTeamHeading = document.querySelector('#myTeamHeading')

// Visible or invisible 
const invisible = 'none'
const visible = 'block'

myTeamSection.style.display = invisible
reserveSection.style.display = invisible

// LocalStorage list and display divs
const typeColors = {
	grass: '#78c850',
	fire: '#f08030',
	water: '#6890f0',
	bug: '#a8b820',
	normal: '#a8a878',
	poison: '#a040a0',
	ground: '#e0c068',
	fighting: '#c03028',
	fairy: '#ee99ac',
	psychic: '#f85888',
	ghost: '#705898',
	ice: '#98d8d8',
	dragon: '#7038f8',
	electric: '#f8d030',
	rock: '#b8a038'
};
let pokemonList = [];
const fetchPokemon = () => {
	const baseUrl = pokemonUrl;
	let pokemonList = [];

	for (let i = 1; i <= 151; i++) {
		const url = `${baseUrl}${i}`;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				const pokemon = {
					name: data.name,
					image: data.sprites['front_default'],
					type: data.types.map(type => type.type.name),
					abilities: data.abilities.map(ability => ability.ability.name)
				};
				const pokemonDiv = document.createElement('div');
				pokemonDiv.setAttribute('class', 'div-card');
				pokemonDiv.setAttribute('id', 'divCard');
				pokemonDiv.innerHTML =
					`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
			<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
			<p class="card-type" id="cardType">Type: ${pokemon.type.join(', ')}</p>
			<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

				const pokemonCardButton = document.createElement('button');
				pokemonCardButton.setAttribute('class', 'card-button');
				pokemonCardButton.setAttribute('id', 'cardButton');
				pokemonCardButton.innerText = 'Add to my team';

				const pokemonCardButtonReserve = document.createElement('button');
				pokemonCardButtonReserve.setAttribute('class', 'card-button-reserve');
				pokemonCardButtonReserve.setAttribute('id', 'cardButtonReserve');
				pokemonCardButtonReserve.innerText = 'Add to reserve';

				// Find righgt color for the border
				const firstType = pokemon.type.find(type => type in typeColors);
				if (firstType) {
					pokemonDiv.style.border = `10px solid ${typeColors[firstType]}`;
				}

				pokemonDiv.append(pokemonCardButton, pokemonCardButtonReserve)
				cardContainer.append(pokemonDiv)


				pokemonList.push(pokemon);

				// Save the list to local storage
				localStorage.setItem('pokemonList', JSON.stringify(pokemonList));

				addPokemonMyTeam()
			})
	}
};
fetchPokemon()

// Search pokemon and display card
searchPokemonInput.addEventListener('input', () => {
	const searchString = searchPokemonInput.value;
	pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

	const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString));

	// Clear the existing content of the container
	cardContainer.innerHTML = '';

	// Create a new div for each matching pokemon and append it to the container
	matchingPokemon.forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card')
		pokemonDiv.setAttribute('id', 'divCard')
		pokemonDiv.innerHTML =
		`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
		<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
		<p class="card-type" id="cardType">Type: ${pokemon.type}</p>
		<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		const pokemonCardButton = document.createElement('button')
		pokemonCardButton.setAttribute('class', 'card-button')
		pokemonCardButton.setAttribute('id', 'cardButton')
		pokemonCardButton.innerText = 'Add to my team'

		const pokemonCardButtonReserve = document.createElement('button')
		pokemonCardButtonReserve.setAttribute('class', 'card-button-reserve')
		pokemonCardButtonReserve.setAttribute('id', 'cardButtonReserve')
		pokemonCardButtonReserve.innerText = 'Add to reserve'

		const cardButtonDiv = document.createElement('div')
		cardButtonDiv.setAttribute('class', 'button-div')
		cardButtonDiv.setAttribute('id', 'buttonDiv')

		
		pokemonDiv.append(pokemonCardButton, pokemonCardButtonReserve)
		cardContainer.append(pokemonDiv);
		// Find righgt color for the border
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeColors[firstType]}`;
		}
	});
});

// FindChampion button
findChampionButton.addEventListener('click', () => {
	searchPokemonNav.style.display = visible

	// Clear content of the container
	cardContainer.innerHTML = '';
	myTeamSection.style.display = invisible
	reserveSection.style.display = invisible

	// Dispaly everything from pokemonList in localstorage
	let pokemonList = JSON.parse(localStorage.getItem('pokemonList')) || {};
	Object.values(pokemonList).forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card')
		pokemonDiv.setAttribute('id', 'divCard')
		pokemonDiv.innerHTML =
			`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
			<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
			<p class="card-type" id="cardType">Type: ${pokemon.type}</p>
			<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		const pokemonCardButton = document.createElement('button')
		pokemonCardButton.setAttribute('class', 'card-button')
		pokemonCardButton.setAttribute('id', 'cardButton')
		pokemonCardButton.innerText = 'Add to my team'

		const pokemonCardButtonReserve = document.createElement('button')
		pokemonCardButtonReserve.setAttribute('class', 'card-button-reserve')
		pokemonCardButtonReserve.setAttribute('id', 'cardButtonReserve')
		pokemonCardButtonReserve.innerText = 'Add to reserve'

		const cardButtonDiv = document.createElement('div')
		cardButtonDiv.setAttribute('class', 'button-div')
		cardButtonDiv.setAttribute('id', 'buttonDiv')

		// Find righgt color for the border
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeColors[firstType]}`;
		}

		pokemonDiv.append(pokemonCardButton, pokemonCardButtonReserve)
		cardContainer.append(pokemonDiv);
	});
})

// Add pokemons to my team in localstorage
function addPokemonMyTeam() {
	let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];

	document.addEventListener('click', (event) => {
		if (event.target.id === 'cardButton') {
			const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
			const pokemon = pokemonList.find(pokemon => pokemon.name === event.target.parentNode.querySelector('#cardHeading').textContent);

			if (myTeamList.length < 3) {
				// Add the pokemon object to the myTeamList array
				myTeamList.push(pokemon);
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
			}
		} else if (event.target.id === 'cardButtonRemove') {
			const pokemonName = event.target.parentNode.querySelector('#cardHeading').textContent;
			// Find the index of the pokemon to remove in the myTeamList array
			const index = myTeamList.findIndex(pokemon => pokemon.name === pokemonName);
			if (index !== -1) {
				// Remove the pokemon from the myTeamList array
				myTeamList.splice(index, 1);
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
				// Remove the pokemonDiv element from the DOM
				event.target.parentNode.remove();
			}
		}
	});
}

// Add pokemons to my reserve in localstorage
function addPokemonMyTeamReserve() {
	let myTeamReserveList = JSON.parse(localStorage.getItem('myTeamReserveList')) || [];

	document.addEventListener('click', (event) => {
		if (event.target.id === 'cardButtonReserve') {
			const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
			const pokemon = pokemonList.find(pokemon => pokemon.name === event.target.parentNode.querySelector('#cardHeading').textContent);

			// Add the pokemon object to the myTeamList array
			myTeamReserveList.push(pokemon);
			// Save the updated myTeamList to localStorage
			localStorage.setItem('myTeamReserveList', JSON.stringify(myTeamReserveList))

		} else if (event.target.id === 'cardButtonRemove') {
			const pokemonName = event.target.parentNode.querySelector('#cardHeading').textContent;
			// Find the index of the pokemon to remove in the myTeamList array
			const index = myTeamReserveList.findIndex(pokemon => pokemon.name === pokemonName);
			if (index !== -1) {
				// Remove the pokemon from the myTeamReserveList array
				myTeamReserveList.splice(index, 1);
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamReserveList', JSON.stringify(myTeamReserveList));
				// Remove the pokemonDiv element from the DOM
				event.target.parentNode.remove();
			}
		}
	});
}

addPokemonMyTeamReserve()
addPokemonMyTeam()

// MyTeam button
myTeamButton.addEventListener('click', () => {
	searchPokemonNav.style.display = "none";

	// Clear content of the container
	cardContainer.innerHTML = '';
	myReserveDivCard.innerHTML = '';
	myTeamDivCard.innerHTML = '';

	myTeamSection.style.display = visible
	reserveSection.style.display = visible

	addMyReserve()
	addMyTeam()
});

// Complete team text
const completeTeam = document.createElement('h3');
completeTeam.setAttribute('class', 'complete-team');
completeTeam.setAttribute('id', 'completeTeam');
completeTeam.innerText = 'Complete team';
completeTeam.style.display = invisible
myTeamHeading.append(completeTeam);

function addMyTeam() {
	// Add my team cards with removebutton
	let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || {};
	let completeTeamDisplayed = false;
	Object.values(myTeamList).forEach(pokemon => {

		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card');
		pokemonDiv.setAttribute('id', 'divCard');
		pokemonDiv.innerHTML =
			`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
				<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
				<p class="card-type" id="cardType">Type: ${pokemon.type}</p>
				<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		const pokemonCardButtonRemove = document.createElement('button')
		pokemonCardButtonRemove.setAttribute('class', 'card-button-remove')
		pokemonCardButtonRemove.setAttribute('id', 'cardButtonRemove')
		pokemonCardButtonRemove.innerText = 'Remove'

			// Find righgt color for the border
			const firstType = pokemon.type.find(type => type in typeColors);
			if (firstType) {
				pokemonDiv.style.border = `10px solid ${typeColors[firstType]}`;
			}

		// If my team equals 3 display complete team text
		if (myTeamList.length === 3) {
			completeTeam.style.display = visible
			completeTeamDisplayed = true;
		}

		pokemonCardButtonRemove.addEventListener('click', () => {
			const completeTeamTextList = document.querySelectorAll('.complete-team');
			completeTeamTextList.forEach(completeTeamText => {
				completeTeamText.style.display = 'none';
			});
			completeTeamDisplayed = false; // reset the flag when the "Complete team" heading is hidden
		});

		pokemonDiv.append(pokemonCardButtonRemove)
		myTeamDivCard.append(pokemonDiv);
	});
}

function addMyReserve() {
	// Add my reserve
	let myTeamReserveList = JSON.parse(localStorage.getItem('myTeamReserveList')) || {};
	Object.values(myTeamReserveList).forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card');
		pokemonDiv.setAttribute('id', 'divCard');
		pokemonDiv.innerHTML =
		`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
				<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
				<p class="card-type" id="cardType">Type: ${pokemon.type}</p>
				<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		const pokemonCardButtonRemove = document.createElement('button')
		pokemonCardButtonRemove.setAttribute('class', 'card-button-remove')
		pokemonCardButtonRemove.setAttribute('id', 'cardButtonRemove')
		pokemonCardButtonRemove.innerText = 'Remove'

		// Find righgt color for the border
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeColors[firstType]}`;
		}

		pokemonDiv.append(pokemonCardButtonRemove)

		myReserveDivCard.append(pokemonDiv);
	});
}


