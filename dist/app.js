const itemForm = document.querySelector('.form');
const itemInput = document.querySelector('.form__input');
const itemList = document.querySelector('.items');
const clearBtn = document.querySelector('.button-clear');
const itemFilter = document.querySelector('.filter__input');
const formBtn = itemForm.querySelector('.form__button');
const itemsAmount = document.querySelector('.list-amount');
const modalOne = document.querySelector('.modal');
const modalTwo = document.querySelector('.modal-two');
const modalOneText = document.querySelector('.modal-text');
const closeModalOne = document.querySelector('.close-modal');
const modalTwoConfirm = document.querySelector('#modal-two-confirm');
const modalTwoDecline = document.querySelector('#modal-two-decline');
let isEditMode = false;

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDOM(item));
	checkUI();
}

function onAddItemSubmit(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	// Validate Input
	if (newItem === '') {
		modalOneText.textContent = 'Wprowadź przedmiot';
		modalOne.showModal();
		return;
	}

	// Check for edit mode
	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');

		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.classList.remove('edit-mode');
		itemToEdit.remove();
		isEditMode = false;
	} else {
		if (checkIfItemExists(newItem)) {
			modalOneText.textContent = 'Ten produkt już jest na liście';
			modalOne.showModal();
			return;
		}
	}

	// Create item DOM element
	addItemToDOM(newItem);

	// Add item to local storage
	addItemToStorage(newItem);

	checkUI();

	itemInput.value = '';
}

function addItemToDOM(item) {
	// Create list item
	const li = document.createElement('li');
	li.className = 'items__item';
	li.appendChild(document.createTextNode(item));

	const button = createButton('items__button remove-item');
	li.appendChild(button);

	// Add li to the DOM
	itemList.appendChild(li);
}

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
}

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

function addItemToStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// Add new item to array
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	let itemsFromStorage;

	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	return itemsFromStorage;
}

function onClickItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
	}
}

function checkIfItemExists(item) {
	const itemsFromStorage = getItemsFromStorage();
	return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
	isEditMode = true;

	itemList.querySelectorAll('li').forEach((i) => (i.style.color = '#D0D3D9'));

	item.classList.add('edit-mode');
	item.style.color = '#28ac17b9';
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Zmień nazwę';
	formBtn.classList.add('green-btn');
	itemInput.value = item.textContent;
	itemInput.focus();
}

function removeItem(item) {
	// Remove item from DOM
	item.remove();

	// Remove item from storage
	removeItemFromStorage(item.textContent);

	checkUI();
}

function removeItemFromStorage(item) {
	let itemsFromStorage = getItemsFromStorage();

	// Filter out item to be removed
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

	// Re-set to localstorage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
	modalTwo.showModal();
	modalTwoConfirm.addEventListener('click', () => {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}

		// Clear from localStorage
		localStorage.removeItem('items');
		modalTwo.close();
		checkUI();
	});
}

function filterItems(e) {
	const items = itemList.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();

		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

function closeModal() {
	modalOne.close();
}

function closeModalTwo() {
	modalTwo.close();
}

function checkUI() {
	itemInput.value = '';

	const items = itemList.querySelectorAll('li');
	const amount = items.length;

	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}

	if (amount === 0) {
		itemsAmount.className = 'not-active';
	} else if (amount > 0) {
		itemsAmount.classList.remove('not-active');
		itemsAmount.classList.add('list-amount');
		itemsAmount.textContent = amount;
	}

	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Dodaj Produkt';
	formBtn.classList.remove('green-btn');
	formBtn.style.color = '#D0D3D9';

	isEditMode = false;
}

// Initialize app
function init() {
	// Event Listeners
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onClickItem);
	clearBtn.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);
	closeModalOne.addEventListener('click', closeModal);
	modalTwoDecline.addEventListener('click', closeModalTwo);

	checkUI();
}

init();
