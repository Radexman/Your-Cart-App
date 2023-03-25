// DOM Elements
const itemForm = document.querySelector('.form');
const itemInput = document.querySelector('.form__input');
const itemList = document.querySelector('.items');

const addItem = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;

	// Validation
	if (newItem === '') {
		alert('Wprowadź produkt');
		return;
	}

	// Create list item
	const li = document.createElement('li');
	li.className = 'items__item';
	const liText = document.createTextNode(newItem);
	li.appendChild(liText);

	const button = createButton('items__button');
	li.appendChild(button);
	itemList.appendChild(li);

	itemInput.value = '';
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
itemForm.addEventListener('submit', addItem);
