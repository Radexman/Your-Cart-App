// DOM Elements
const form = document.querySelector('.form');
const itemInput = document.querySelector('.form__input');
const list = document.querySelector('.items');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const modalText = document.querySelector('.modal-text');
const clearButton = document.querySelector('.button-clear');

const addItem = (e) => {
	e.preventDefault();

	const itemValue = itemInput.value;

	// Validation
	if (itemValue === '') {
		modalText.innerText = 'Wprowadź Produkt';
		modal.showModal();
		return;
	}

	// Create Item
	const li = document.createElement('li');
	li.className = 'items__item';
	const liText = document.createTextNode(itemValue);
	li.appendChild(liText);

	const button = createButton('items__button remove-item');
	li.appendChild(button);

	list.appendChild(li);

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

const removeItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		e.target.parentElement.parentElement.remove();
	}
};

const clearItems = (e) => {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
};

// Event Listeners
form.addEventListener('submit', addItem);

closeModal.addEventListener('click', () => {
	modal.close();
});

list.addEventListener('click', removeItem);

clearButton.addEventListener('click', clearItems);
