// DOM Elements
const form = document.querySelector('.form');
const itemInput = document.querySelector('.form__input');
const list = document.querySelector('.items');
const modal = document.querySelector('.modal');
const modalTwo = document.querySelector('.modal-two');
const closeModal = document.querySelector('.close-modal');
const modalTwoConfirm = document.querySelector('#modal-two-confirm');
const modalTwoDeclane = document.querySelector('#modal-two-decline');
const clearButton = document.querySelector('.button-clear');
const itemFilter = document.querySelector('.filter__input');

const addItem = (e) => {
	e.preventDefault();

	const itemValue = itemInput.value;

	// Validation
	if (itemValue === '') {
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

	// Add li
	list.appendChild(li);

	checkUI();

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
		checkUI();
	}
};

const clearItems = (e) => {
	modalTwo.showModal();
};

const deleteItems = () => {
	modalTwo.close();
	while (list.firstChild) {
		list.removeChild(list.firstChild);
		checkUI();
	}
};

const checkUI = () => {
	const items = list.querySelectorAll('li');
	if (items.length === 0) {
		clearButton.classList.add('not-active');
		itemFilter.classList.add('not-active');
	} else {
		clearButton.classList.remove('not-active');
		itemFilter.classList.remove('not-active');
	}
};

// Event Listeners
form.addEventListener('submit', addItem);

closeModal.addEventListener('click', () => {
	modal.close();
});

list.addEventListener('click', removeItem);

clearButton.addEventListener('click', clearItems);

modalTwoDeclane.addEventListener('click', () => {
	modalTwo.close();
});

modalTwoConfirm.addEventListener('click', deleteItems);

checkUI();
