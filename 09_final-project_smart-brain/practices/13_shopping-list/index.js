/**
 * FEATURES
 * - add item
 * 		- text should be added to list
 * 		- text should be removed from inputs 
 * - clicking item: toggles strikethrough
 * 
 * BONUS
 * - remove item ( with a delete button )
 * 
 * EXTRA
 * - UI: having the shopping list displayed on the y axis
 * ( need to handle then the deletion according to their position )
 */


/* -------------------------------------------------------------------------- */
/*                              SELECTORS RELATED                             */
/* -------------------------------------------------------------------------- */

/* --------------------------------- BUTTON --------------------------------- */
const getListsContainer = () => document.getElementById('lists-container');
const getLiTags = () => document.body.querySelectorAll('li');
const getButtonAddTag = () => document.body.querySelector('#button_add-item');
const getInputTag = () => document.body.querySelector('#input_add-item');
const getLastUlTag = () => document.body.querySelector('ul:last-child');

/* ---------------------------------- UL(s) --------------------------------- */
/** gets list to add items to 
 * - abstracting away which ul to select to add items to it
 */
const getUlList = () => {
	let ul;

	// if there are no list, adds a list in the DOM
	if( !getLastUlTag() ){
		let ul = createListElement()
		getListsContainer().append(ul);
	}

	// gets available list from the DOM
	ul = getLastUlTag();

	// if available list is full, create another list in the DOM
	if( isExceeding6( ul ) || !ul ){ 
		const ulParent = ul.parentElement
		ul = createListElement();
		ulParent.appendChild(ul);
	}
	return ul;
};

/** creates an ul list tag  */
function createListElement(){
	const newUlTag = document.createElement('ul');
	return newUlTag;
}

function createListItemElement(textValue){
	// creates a shopping item `li`
	const li = document.createElement('li');
		
	// creates delete button to add within the `li`
	const deleteIcon = createDeleteIcon();

	// set event handler to `li` shopping item
	li.addEventListener('click', toggleItemState);

	// creates the `li` shopping item content ( text and delete button )
	const text = document.createTextNode(textValue);
	li.append(deleteIcon, text);

	return li;
}

/** creates `span` with `i` to create the delete icon button */
function createDeleteIcon(){
	// creates wrapper to the delete icon
	const newDeleteIconWrapper = document.createElement('span')
	newDeleteIconWrapper.classList.add('icon');

	// creates wrappers's inner icon
	const newDeleteIcon = document.createElement('i')
	newDeleteIcon.classList.add('delete-icon');

	// adds icon in the wrapper icon
	newDeleteIconWrapper.append(newDeleteIcon);

	// sets `click` event to delete a shopping item
	newDeleteIconWrapper.addEventListener('click', deleteShoppingItem );

	return newDeleteIconWrapper;
}


/** deletes shopping item  */
function deleteShoppingItem(e){
	e.stopPropagation();
	const liContainer = e.target.closest('li');
	const ulContainer = e.target.closest('ul');

	// removes corresponding li
	const allLi = getLiTags();
	allLi.forEach((li )=> {
		if(li === liContainer ){
			ulContainer.removeChild(li);
		}
	})
	
	// removes ul parent tag if there are no children
	if(!ulContainer.children.length){
		getListsContainer().removeChild(ulContainer);
	}

	// transfer li to the previous list
	if( ulContainer.children.length < 6 ){
		transferLiToUl(ulContainer);
	}


}

/** transfers next shopping item from the next `ul` to the previous `ul` */
function transferLiToUl(ulContainer){
	const listsContainer = getListsContainer();

	// gets the closest ul to transfer extra li
	if(listsContainer.children.length > 1){
		const nextUl = ulContainer.nextElementSibling
		
		// if an `ul` sibling exist -> remove child
		if(!!nextUl.children.length){
			const liToTransfer = nextUl.children[0];
			nextUl.removeChild(liToTransfer);
			ulContainer.append(liToTransfer);
		}
		// if next list is empty, removes it
		if(!nextUl.children.length) {
			getListsContainer().removeChild(nextUl)
		}
	}
}



/* -------------------------------------------------------------------------- */
/*                               LAYOUT RELATED                               */
/* -------------------------------------------------------------------------- */

/** Allows to control a max of 6 items per list  */
function isExceeding6(ul){
	return ul.children.length === 6;
}

/* -------------------------------------------------------------------------- */
/*                              FEATURES RELATED                              */
/* -------------------------------------------------------------------------- */

/** sets or un-sets `done` class on click on the shopping item */
const toggleItemState = (e) => {
	e.target.classList.toggle('done');
}

/** adds input's value to the list */
const addShoppingItem = (e) => {
	const input = getInputTag();

	// determines the even name from triggered event listener
	const isPressEnter = e.type === 'keypress' && e.key === 'Enter';
	const isAddButton = e.type === 'click';
	const hasValueToAdd = !!input.value;

	// adds input's value to the list when there is a valid content
	if(hasValueToAdd && ( isPressEnter || isAddButton )){

		const ul = getUlList();

		const li = createListItemElement(input.value);

		// adds li to the list
		ul.appendChild(li);

		// clears the inputs
		input.value = "";
	}

	// handles input's visual error feedback
	if(!hasValueToAdd && ( isPressEnter || isAddButton )){
		input.parentElement.classList.add('error-input');
		setTimeout(() => {
			input.parentElement.classList.remove('error-input');
		}, 800)
	}
}


/* -------------------------------------------------------------------------- */
/*                        SETS ELEMENTS EVENTS HANDLERS                       */
/* -------------------------------------------------------------------------- */

/* Updates existing li by adding them event listeners */
const liElements = getLiTags();
for( let li of liElements ){
	li.addEventListener('click', toggleItemState );
	li.querySelector('span').addEventListener('click', deleteShoppingItem)
}

/** Button and Input event handler assignation  */
// on click on the add button
const button_addItem = getButtonAddTag();
button_addItem.addEventListener('click', addShoppingItem );

// on key `Enter` pressed
const input = getInputTag();
input.addEventListener("keypress", addShoppingItem);
