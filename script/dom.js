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

// Card border color
const typeBorderColors = {
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
	rock: '#b8a038',
	dark: '#333333',
	steel: '#c0c0c0',
	flying: '#a8a878'
};

// Card color
const typeColors = {
	grass: '#E6F5DE',
	fire: '#FFE2CE',
	water: '#EDF2FE',
	bug: '#F3FBB2',
	normal: '#FFFFF3',
	poison: '#ECD6EC',
	ground: '#FFF9E7',
	fighting: '#FFC4C1',
	fairy: '#FCF6F7',
	psychic: '#FEE5ED',
	ghost: '#C8C2D3',
	ice: '#DDF5F5',
	dragon: '#C8B3F9',
	electric: '#FFF1B7',
	rock: '#FFF5C9',
	dark: '#9D9C9C',
	steel: '#EEEEEE',
	flying: '#FFFFF3'
}
let myTeamOrgText = myTeamButton.innerText
function loadButton() {
	myTeamButton.disabled = true
	myTeamButton.innerText = 'Loading'
	myTeamButton.setAttribute('class', 'loading-button')
}

// LocalStorage list and display divs
let pokemonList = [];
const fetchPokemon = async () => {
	const pokemonAmount = 1008;
	loadButton()

	for (let i = 1; i <= pokemonAmount; i++) {
		const url = `${pokemonUrl}${i}`;
		const response = await fetch(url);
		const data = await response.json();
		const pokemon = {
			name: data.name,
			image: data.sprites.front_default,
			type: data.types.map(type => type.type.name),
			abilities: data.abilities.map(ability => ability.ability.name),
		}

		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card');
		pokemonDiv.innerHTML =
			`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
			<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
			<p class="card-type" id="cardType">Type: ${pokemon.type.join(', ')}</p>
			<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		function addPokemonMyTeamList() {
			const pokemonCardButton = document.createElement('button');
			pokemonCardButton.setAttribute('class', 'card-button');
			pokemonCardButton.innerText = 'Add to my team';
			pokemonCardButton.addEventListener('click', (event) => {
				let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
				const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
				const pokemonNameHeading = event.target.parentNode.querySelector('#cardHeading');
				const pokemon = pokemonList.find(pokemon => pokemon.name === pokemonNameHeading.textContent);

				//Change text inside add button
				if (myTeamList.length < 3) {
					const addButton = pokemonCardButton;
					let originalText = addButton.innerText;
					let origianlColor = addButton.style.color;
					addButton.innerText = '+1';
					addButton.style.color = 'green'
					addButton.disabled = true;
					setTimeout(() => {
						const newText = addButton.innerText;
						addButton.disabled = false;
						if (newText === '+1') {
							addButton.innerText = originalText;
							addButton.style.color = origianlColor;
						}
					}, 500);
				}
				if (myTeamList.length >= 3) {
					const addButton = pokemonCardButton
					let originalText = addButton.innerText;
					let originalColor = addButton.style.color;
					addButton.innerText = 'Your team is full';
					addButton.style.color = 'red';
					setTimeout(() => {
						const newText = addButton.innerText;
						if (newText === 'Your team is full') {
							addButton.innerText = originalText;
							addButton.style.color = originalColor;
						}
					}, 1000);
				}
				// Update the name of the pokemon in local storage
				const pokemonIndex = myTeamList.findIndex(p => p.name === pokemon.name);
				if (pokemonIndex !== -1) {
					myTeamList[pokemonIndex].name = pokemonNameHeading.textContent;
				}

				if (myTeamList.length < 3) {
					// Append the new pokemon object to the existing myTeamList array
					myTeamList.push(pokemon);
					// Save the updated myTeamList to localStorage
					localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
				}
			})
			pokemonDiv.append(pokemonCardButton)
			cardContainer.append(pokemonDiv)
		}
		addPokemonMyTeamList()

		const pokemonCardButtonReserve = document.createElement('button');
		pokemonCardButtonReserve.setAttribute('class', 'card-button-reserve');
		pokemonCardButtonReserve.setAttribute('id', 'cardButtonReserve');
		pokemonCardButtonReserve.innerText = 'Add to reserve';

		//Change text inside reserve button
		pokemonCardButtonReserve.addEventListener('click', event => {
			const addButton = event.target;
			let originalText = addButton.innerText;
			let origianlColor = addButton.style.color;
			addButton.innerText = '+1';
			addButton.style.color = 'green'
			setTimeout(() => {
				const newText = addButton.innerText;
				if (newText === '+1') {
					addButton.innerText = originalText;
					addButton.style.color = origianlColor;
				}
			}, 500);
		});

		// Find righgt color for the border and background
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeBorderColors[firstType]}`;
			pokemonDiv.style.backgroundColor = `${typeColors[firstType]}`;
		}

		pokemonDiv.append(pokemonCardButtonReserve)
		cardContainer.append(pokemonDiv)

		pokemonList.push(pokemon);

		// Save the list to local storage
		localStorage.setItem('pokemonList', JSON.stringify(pokemonList));

		console.log('debug 2')
	}
}

// Enable myTeamButton after fetch
fetchPokemon().then(() => {
	myTeamButton.disabled = false
	myTeamButton.innerText = myTeamOrgText
	myTeamButton.setAttribute('class', 'content__my-team')
})
addPokemonMyTeam()

// Search pokemon and display card
searchPokemonInput.addEventListener('input', () => {
	const searchString = searchPokemonInput.value;
	pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
	const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchString.toLowerCase()));

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
		pokemonCardButton.innerText = 'Add to my team'
		pokemonCardButton.addEventListener('click', (event) => {
			let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
			if (myTeamList.length < 3) {
				const addButton = event.target;
				let originalText = addButton.innerText;
				let origianlColor = addButton.style.color;
				addButton.innerText = '+1';
				addButton.style.color = 'green'
				addButton.disabled = true;
				setTimeout(() => {
					const newText = addButton.innerText;
					addButton.disabled = false;
					if (newText === '+1') {
						addButton.innerText = originalText;
						addButton.style.color = origianlColor;
					}
				}, 500);
			}
		})

		pokemonCardButton.addEventListener('click', (event) => {
			let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
			const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
			const pokemonNameHeading = event.target.parentNode.querySelector('#cardHeading');
			const pokemon = pokemonList.find(pokemon => pokemon.name === pokemonNameHeading.textContent);

			if (myTeamList.length >= 3) {
				const addButton = event.target;
				let originalText = addButton.innerText;
				let originalColor = addButton.style.color;
				addButton.innerText = 'Your team is full';
				addButton.style.color = 'red';
				setTimeout(() => {
					const newText = addButton.innerText;
					if (newText === 'Your team is full') {
						addButton.innerText = originalText;
						addButton.style.color = originalColor;
					}
				}, 1000);
			}

			// Update the name of the pokemon in local storage
			const pokemonIndex = myTeamList.findIndex(p => p.name === pokemon.name);
			if (pokemonIndex !== -1) {
				myTeamList[pokemonIndex].name = pokemonNameHeading.textContent;
			}

			if (myTeamList.length < 3) {
				// Append the new pokemon object to the existing myTeamList array
				myTeamList.push(pokemon);
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
			}
		})

		const pokemonCardButtonReserve = document.createElement('button')
		pokemonCardButtonReserve.setAttribute('class', 'card-button-reserve')
		pokemonCardButtonReserve.setAttribute('id', 'cardButtonReserve')
		pokemonCardButtonReserve.innerText = 'Add to reserve'
		pokemonCardButtonReserve.addEventListener('click', (event) => {
			const addButton = event.target;
			let originalText = addButton.innerText;
			let origianlColor = addButton.style.color;
			addButton.innerText = '+1';
			addButton.style.color = 'green'
			addButton.disabled = true;
			setTimeout(() => {
				const newText = addButton.innerText;
				addButton.disabled = false;
				if (newText === '+1') {
					addButton.innerText = originalText;
					addButton.style.color = origianlColor;
				}
			}, 500);
		})

		const cardButtonDiv = document.createElement('div')
		cardButtonDiv.setAttribute('class', 'button-div')
		cardButtonDiv.setAttribute('id', 'buttonDiv')

		// Find righgt color for the border and background
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeBorderColors[firstType]}`;
			pokemonDiv.style.backgroundColor = `${typeColors[firstType]}`;
		}

		pokemonDiv.append(pokemonCardButton, pokemonCardButtonReserve)
		cardContainer.append(pokemonDiv);
	});
})

// FindChampion button
findChampionButton.addEventListener('click', (event) => {
	searchPokemonNav.style.display = visible

	// Clear content inside containercand input field
	cardContainer.innerHTML = '';
	myTeamSection.style.display = invisible
	reserveSection.style.display = invisible
	searchPokemonInput.value = '';

	// Dispaly everything from pokemonList in localstorage
	let pokemonList = JSON.parse(localStorage.getItem('pokemonList')) || {};
	Object.values(pokemonList).forEach(pokemon => {
		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card')
		pokemonDiv.setAttribute('id', 'divCard')
		pokemonDiv.innerHTML =
			`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
			<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
			<p class="card-type" id="cardType">Type: ${pokemon.type.join(', ')}</p>
			<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		const pokemonCardButton = document.createElement('button')
		pokemonCardButton.setAttribute('class', 'card-button')
		pokemonCardButton.innerText = 'Add to my team'
		pokemonCardButton.addEventListener('click', (event) => {
			let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
			if (myTeamList.length < 3) {
				const addButton = event.target;
				let originalText = addButton.innerText;
				let origianlColor = addButton.style.color;
				addButton.innerText = '+1';
				addButton.style.color = 'green'
				addButton.disabled = true;
				setTimeout(() => {
					const newText = addButton.innerText;
					addButton.disabled = false;
					if (newText === '+1') {
						addButton.innerText = originalText;
						addButton.style.color = origianlColor;
					}
				}, 500);
			}
		})

		pokemonCardButton.addEventListener('click', (event) => {
			let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
			const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
			const pokemonNameHeading = event.target.parentNode.querySelector('#cardHeading');
			const pokemon = pokemonList.find(pokemon => pokemon.name === pokemonNameHeading.textContent);

			if (myTeamList.length >= 3) {
				const addButton = event.target;
				let originalText = addButton.innerText;
				let originalColor = addButton.style.color;
				addButton.innerText = 'Your team is full';
				addButton.style.color = 'red';
				setTimeout(() => {
					const newText = addButton.innerText;
					if (newText === 'Your team is full') {
						addButton.innerText = originalText;
						addButton.style.color = originalColor;
					}
				}, 1000);
			}

			// Update the name of the pokemon in local storage
			const pokemonIndex = myTeamList.findIndex(p => p.name === pokemon.name);
			if (pokemonIndex !== -1) {
				myTeamList[pokemonIndex].name = pokemonNameHeading.textContent;
			}

			if (myTeamList.length < 3) {
				// Append the new pokemon object to the existing myTeamList array
				myTeamList.push(pokemon);
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
			}
		})

		const pokemonCardButtonReserve = document.createElement('button')
		pokemonCardButtonReserve.setAttribute('class', 'card-button-reserve')
		pokemonCardButtonReserve.setAttribute('id', 'cardButtonReserve')
		pokemonCardButtonReserve.innerText = 'Add to reserve'
		pokemonCardButtonReserve.addEventListener('click', (event) => {
			const addButton = event.target;
			let originalText = addButton.innerText;
			let origianlColor = addButton.style.color;
			addButton.innerText = '+1';
			addButton.style.color = 'green'
			addButton.disabled = true;
			setTimeout(() => {
				const newText = addButton.innerText;
				addButton.disabled = false;
				if (newText === '+1') {
					addButton.innerText = originalText;
					addButton.style.color = origianlColor;
				}
			}, 500);
		})

		const cardButtonDiv = document.createElement('div')
		cardButtonDiv.setAttribute('class', 'button-div')
		cardButtonDiv.setAttribute('id', 'buttonDiv')

		// Find righgt color for the border and background
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeBorderColors[firstType]}`;
			pokemonDiv.style.backgroundColor = `${typeColors[firstType]}`;
		}

		pokemonDiv.append(pokemonCardButton, pokemonCardButtonReserve)
		cardContainer.append(pokemonDiv);
	});
})

// Add pokemons to my team in localstorage
function addPokemonMyTeam() {
	const pokemonCardButton = document.createElement('button')
	pokemonCardButton.setAttribute('class', 'card-button')
	pokemonCardButton.innerText = 'Add to my team'
	pokemonCardButton.addEventListener('click', (event) => {
		let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
		const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
		const pokemonNameHeading = event.target.parentNode.querySelector('#cardHeading');
		const pokemon = pokemonList.find(pokemon => pokemon.name === pokemonNameHeading.textContent);

		if (myTeamList.length >= 3) {
			const addButton = event.target;
			let originalText = addButton.innerText;
			let originalColor = addButton.style.color;
			addButton.innerText = 'Your team is full';
			addButton.style.color = 'red';
			setTimeout(() => {
				const newText = addButton.innerText;
				if (newText === 'Your team is full') {
					addButton.innerText = originalText;
					addButton.style.color = originalColor;
				}
			}, 1000);
		}

		// Update the name of the pokemon in local storage
		const pokemonIndex = myTeamList.findIndex(p => p.name === pokemon.name);
		if (pokemonIndex !== -1) {
			myTeamList[pokemonIndex].name = pokemonNameHeading.textContent;
		}

		if (myTeamList.length < 3) {
			// Append the new pokemon object to the existing myTeamList array
			myTeamList.push(pokemon);
			// Save the updated myTeamList to localStorage
			localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
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

			myTeamReserveList.push(pokemon);
			localStorage.setItem('myTeamReserveList', JSON.stringify(myTeamReserveList))

		} else if (event.target.id === 'cardButtonRemoveReserve') {
			const pokemonName = event.target.parentNode.querySelector('#cardHeading').textContent;
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
completeTeam.innerText = 'You need 3 champions for your team';
// completeTeam.style.display = invisible
myTeamHeading.append(completeTeam);

function addMyTeam() {
	// Add my team cards with removebutton
	let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || {};
	myTeamList.forEach(pokemon => {
		const imgPen = document.createElement('img')
		imgPen.src = "images/pen.png"

		const pokemonDiv = document.createElement('div');
		pokemonDiv.setAttribute('class', 'div-card');
		pokemonDiv.setAttribute('id', 'divCard');
		pokemonDiv.innerHTML =
			`<h2 class="card-name" id="cardHeading">${pokemon.name}</h2>
			<img class="edit-name" id="editName" src="${imgPen.src}"></img>
				<img class="card-img" id="cardImg" src="${pokemon.image}" alt="${pokemon.name}">
				<p class="card-type" id="cardType">Type: ${pokemon.type}</p>
				<p class="card-ability" id="cardAbility">Ability: ${pokemon.abilities.join(', ')}</p>`;

		const pokemonCardButtonRemove = document.createElement('button')
		pokemonCardButtonRemove.setAttribute('class', 'card-button-remove')
		pokemonCardButtonRemove.innerText = 'Remove'
		pokemonCardButtonRemove.addEventListener('click', (event) => {
			let myTeamList = JSON.parse(localStorage.getItem('myTeamList')) || [];
			let pokemonName = event.target.parentNode.querySelector('#cardHeading').textContent;
			const index = myTeamList.findIndex(pokemon => pokemon.name === pokemonName);
			if (index !== -1) {
				console.log('cardButtonRemoveTeam. removing pokemon', index, myTeamList[index].name)
				// Remove the pokemon from the myTeamList
				myTeamList.splice(index, 1);
				// Save the updated myTeamList to localStorage
				localStorage.setItem('myTeamList', JSON.stringify(myTeamList));
				// Remove the pokemonDiv element from the DOM
				event.target.parentNode.remove();
			}
		})

		const editNameButton = pokemonDiv.querySelector('#editName')
		const pokemonNameHeading = pokemonDiv.querySelector('#cardHeading');

		// Change pokemon name
		editNameButton.addEventListener('click', () => {
			const editNameInput = document.createElement('input');
			editNameInput.setAttribute('class', 'edit-name-input');
			editNameInput.maxLength = 8
			pokemonNameHeading.innerHTML = ''
			editNameInput.value = pokemonNameHeading.textContent

			editNameInput.addEventListener('keyup', (event) => {
				if (event.key === 'Enter') {
					pokemon.name = editNameInput.value
					pokemonNameHeading.textContent = editNameInput.value
					localStorage.setItem('myTeamList', JSON.stringify(myTeamList))
					editNameInput.replaceWith(pokemonNameHeading)
				}
			});
			pokemonNameHeading.replaceWith(editNameInput)
			editNameInput.focus()
		})

		let upButton = document.createElement("button");
		upButton.setAttribute('class', 'upButton')
		upButton.innerText = "Up";
		upButton.addEventListener("click", function () {
			let prevSibling = pokemonDiv.previousElementSibling;
			if (prevSibling !== null) {
				myTeamDivCard.insertBefore(pokemonDiv, prevSibling);
			}
		});

		let downButton = document.createElement("button");
		downButton.setAttribute('class', 'downButton')
		downButton.innerText = "Down";
		downButton.addEventListener("click", function () {
			let nextSibling = pokemonDiv.nextElementSibling;
			if (nextSibling !== null) {
				myTeamDivCard.insertBefore(nextSibling, pokemonDiv);
			}
		});

		// Find right color for the border and background
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeBorderColors[firstType]}`;
			pokemonDiv.style.backgroundColor = `${typeColors[firstType]}`;
		}

		// If my team equals 3 display complete team text
		if (myTeamList.length === 3) {
			completeTeam.innerText = 'Your team is complete'
		}

		pokemonCardButtonRemove.addEventListener('click', () => {
			completeTeam.innerText = 'You need 3 champions for your team'
		});

		pokemonDiv.append(upButton, downButton, pokemonCardButtonRemove)
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
		pokemonCardButtonRemove.setAttribute('id', 'cardButtonRemoveReserve')
		pokemonCardButtonRemove.innerText = 'Remove'

		// Push card from reserve to my team
		document.addEventListener('click', (event) => {
			if (event.target.id === 'cardButton') {
				const myTeamReserveList = JSON.parse(localStorage.getItem('myTeamReserveList'));
				const pokemon = myTeamReserveList.find(pokemon => pokemon.name === event.target.parentNode.querySelector('#cardHeading').textContent);

				// Remove card from reserve
				const pokemonName = event.target.parentNode.querySelector('#cardHeading').textContent;
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
		})

		// Find righgt color for the border and background
		const firstType = pokemon.type.find(type => type in typeColors);
		if (firstType) {
			pokemonDiv.style.border = `10px solid ${typeBorderColors[firstType]}`;
			pokemonDiv.style.backgroundColor = `${typeColors[firstType]}`;
		}

		addPokemonMyTeam()
		pokemonDiv.append(pokemonCardButtonRemove)
		myReserveDivCard.append(pokemonDiv);
	});
}