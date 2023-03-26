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
const formBtn = form.querySelector('button');
let isEditMode = false;

const displayItems = () => {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => {
		addItemToDOM(item);
	});
	checkUI();
};

const onAddItemSubmit = (e) => {
	e.preventDefault();

	const itemValue = itemInput.value;

	// Validation
	if (itemValue === '') {
		modal.showModal();
		return;
	}

	// Check for edit mode
	if (isEditMode) {
		const itemToEdit = list.querySelector('.edit-mode');

		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.classList.remove('edit-mode');
		itemToEdit.remove();
		isEditMode = false;
	}

	// Create item DOM element
	addItemToDOM(itemValue);

	// Add item to local storage
	addItemToStorage(itemValue);

	checkUI();

	itemInput.value = '';
};

const addItemToDOM = (item) => {
	// Create Item
	const li = document.createElement('li');
	li.className = 'items__item';
	const liText = document.createTextNode(item);
	li.appendChild(liText);

	const button = createButton('items__button remove-item');
	li.appendChild(button);

	// Add li
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

const addItemToStorage = (item) => {
	const itemsFromStorage = getItemsFromStorage();

	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
	let itemsFromStorage;
	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	return itemsFromStorage;
};

const onClickItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
	}
};

const setItemToEdit = (item) => {
	isEditMode = true;

	list.querySelectorAll('li').forEach((i) => (i.style.color = '#D0D3D9'));

	item.classList.add('edit-mode');
	item.style.color = '#28ac17b9';
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Zmień nazwę';
	formBtn.classList.add('green-btn');
	itemInput.value = item.textContent;
};

const removeItem = (item) => {
	// Remove item from DOM
	item.remove();

	// Remove item ftom storage
	removeItemFromStorage(item.textContent);

	checkUI();
};

const removeItemFromStorage = (item) => {
	let itemsFromStorage = getItemsFromStorage();

	// Filter out item
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

	// Reset to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const clearItems = (e) => {
	modalTwo.showModal();
};

const deleteItems = () => {
	modalTwo.close();
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}

	// Clear from local storage
	localStorage.removeItem('items');

	checkUI();
};

const filterItems = (e) => {
	const items = list.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();

		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
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

	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Dodaj Produkt';
	formBtn.classList.remove('green-btn');
	formBtn.style.color = '#D0D3D9';
	isEditMode = false;
};

// Initialize app
const init = () => {
	// Event Listeners
	form.addEventListener('submit', onAddItemSubmit);

	closeModal.addEventListener('click', () => {
		modal.close();
	});

	list.addEventListener('click', onClickItem);

	clearButton.addEventListener('click', clearItems);

	modalTwoDeclane.addEventListener('click', () => {
		modalTwo.close();
	});

	modalTwoConfirm.addEventListener('click', deleteItems);

	itemFilter.addEventListener('input', filterItems);

	document.addEventListener('DOMContentLoaded', displayItems);

	checkUI();
};

init();
