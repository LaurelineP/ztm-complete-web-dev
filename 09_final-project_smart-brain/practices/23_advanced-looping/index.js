const basket = ['apples', 'oranges', 'grapes'];
const detailedBasket = {
  apples: 5,
  oranges: 10,
  grapes: 1000
}

//1
for (let i = 0; i < basket.length; i++) {
  console.log(basket[i]);
}

//2
basket.forEach(item => {
  console.log(item);
})

for (item in detailedBasket) {
  console.log(item);
}

for (item of basket) {
  console.log(item);
}

// Question #1:
// create a function called biggestNumberInArray() that takes
// an array as a parameter and returns the biggest number.
// biggestNumberInArray([-1,0,3,100, 99, 2, 99]) should return 100;
// Use at least 3 different types of javascript loops to write this:
const array = [-1,0,3,100, 99, 2, 99] // should return 100
const array2 = ['a', 3, 4, 2] // should return 4
const array3 = [] // should return 0



let result;
function biggestNumberInArray(arr) {
	// Using iterable loop
	let maxNumber = null;
	for( n of arr){
		maxNumber = n > maxNumber ? n : maxNumber;
	}
	return maxNumber;
}
result = biggestNumberInArray(array);
console.info('Using `for...of`:', result);


function biggestNumberInArray2(arr) {
	// Using enumerable loop
	let maxNumber = null;
	for( n in arr){
		if( arr[n] > maxNumber ){ maxNumber = arr[n] }
	}
	return maxNumber;
}
result = biggestNumberInArray2(array2);
console.info('Using `for...in`:', result);



function biggestNumberInArray3(arr) {
	let maxNumber = null;
	for( let i = 0; i <= arr.length; i++){
		maxNumber = arr[i] > maxNumber ? arr[i] : maxNumber || 0;
	}
	return maxNumber;
}
result = biggestNumberInArray3(array3);
console.info('Using `for loop`:', result);


// Question #2:
// Write a function checkBasket() that lets you know if the item is in the basket or not
amazonBasket = {
  glasses: 1,
  books: 2,
  floss: 100
}

function checkBasket(basket, lookingFor) {
	return !!basket[ lookingFor ];
}
result = checkBasket(amazonBasket, 'glasses');
console.info('Check item without loop `glasses`:', result);

result = checkBasket(amazonBasket, 'rocket');
console.info('Check item without loop`rocket`:', result);


function checkBasketWithLoop(basket, lookingFor) {
	let doesExist = false;
	for( item in basket ){
		if( item === lookingFor ) doesExist = true;
	}
	return doesExist;
}
result = checkBasketWithLoop(amazonBasket, 'hat');
console.info('Check item with loop`hat`:', result);

result = checkBasketWithLoop(amazonBasket, 'books');
console.info('Check item with loop`books`:', result);