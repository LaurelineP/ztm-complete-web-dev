/* ------------------------------ * KEYLESS CAR ----------------------------- */
/** 
 * Arrays
 *  - Using 
 * 		var array1 = ["Banana", "Apples", "Oranges", "Blueberries"]
 * 		- Remove the Banana from the array.
 * 		- Sort the array in order.
 * 		- Put "Kiwi" at the end of the array.
 * 		- Remove "Apples" from the array.
 *  - Using
 * 		var array2 = ["Banana", ["Apples", ["Oranges"], "Blueberries"]]
 * 		- access the orange Value
 */

/* -------------------------------------------------------------------------- */
/*                                   ARRAY 1                                  */
/* -------------------------------------------------------------------------- */
let resultArray1;
let array1 = ["Banana", "Apples", "Oranges", "Blueberries"];
const expectedArray1 = ["Kiwi", "Oranges", "Blueberries"];
/** Remove the Banana from the array. **************************************  */
array1.shift();


/* Sort the array in order. ************************************************  */
array1.sort();



/* Put "Kiwi" at the end of the array **************************************  */
array1.push('Kiwi');



/* Remove "Apples" from the array. *****************************************  */
array1.splice('Apple', 1);



/* Sort array in reverse order. ********************************************  */
array1.sort((a,b) => {
	if( b < a ) return -1;
	if( b > 1 ) return 1;
	return 0;
});



/* -------------------------------------------------------------------------- */
/*                                   ARRAY 2                                  */
/* -------------------------------------------------------------------------- */
const array2 = ["Banana", ["Apples", ["Oranges"], "Blueberries"]];

/** Access the "Orange" value. *********************************************  */
const resultArray2 = array2[1][1];




console.info('1 - `array1` result is:', array1, "\nIs as expected? ", array1.toString() === array1.toString() );
console.info('2 - `array2` result is:', resultArray2);
