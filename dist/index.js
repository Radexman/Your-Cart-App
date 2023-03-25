// DOM Elements
const form = document.querySelector('.form');
const itemInput = document.querySelector('.form__input');
const list = document.querySelector('.items');

const addItem = (e) => {
	e.preventDefault();

	const itemValue = itemInput.value;

	// Validation
	if (itemValue === '') {
		alert('Wprowadź przedmiot');
		return;
	}

	// Create Item
	const li = document.createElement('li');
	li.className = 'items__item';
	const liText = document.createTextNode(itemValue);
	li.appendChild(liText);

	const button = createButton('items__button');
	li.appendChild(button);

	list.appendChild(li);
};

const createButton = (classes) => {
	const button = document.createElement('button');
	button.className = classes;

	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);

	return button;
};

const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

// Event Listeners
form.addEventListener('submit', addItem);
