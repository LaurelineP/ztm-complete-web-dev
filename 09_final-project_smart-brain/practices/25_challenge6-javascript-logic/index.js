

/**
 * Note: `organizeValues` it the implementation handling both:
 * - individuals and duplicates
 * - and type
 */

console.group('Question 1 - [ organizeValues ]:\nOrganize values in order by individuals and duplicates , or (bonus) by item types. \n');
console.table([
	{ input:  JSON.stringify([1,2,4,591,392,391,2,5,10,2,1,1,1,20,20]), output: JSON.stringify(organizeValues([1,2,4,591,392,391,2,5,10,2,1,1,1,20,20])) },
	{ input:  JSON.stringify([1, "2", "3", 2]), output: JSON.stringify(organizeValues([1, "2", "3", 2])) }
], ['input','output'])
console.groupEnd();


/**
 * Note: backward cases are when the expected number is the calculation of
 * the highest number + a previous number
 * - those are the one that really test the whole implementation's capacity
 */
console.group('Question 2 - [ findSumValues ]:\nFind numbers in array that compute the given output.\n');
console.table([
	{ 'input array':  JSON.stringify([1,2,3]), 'input given output': 4 , output: JSON.stringify(findSumValues([1,2,3], 4))},
	{ 'input array':  JSON.stringify([0, 1, 5, 4 ,2, 3, 8]), 'input given output': 8 , output: JSON.stringify(findSumValues([0, 1, 5, 4 ,2, 3, 8], 8)) },
	{ 'input array':  JSON.stringify([0, 1, 5, 4 ,2, 3, 10]), 'input given output': 10 , output: JSON.stringify(findSumValues([0, 1, 5, 4 ,2, 3, 8], 10)) }
], ['input array','input given output', 'output'])
console.groupEnd();



console.group('Question 3 - [ getHexadecimalOrRGBFrom ]:\nFrom hexadecimal (3 or 6 values) outputs RGB, from RGB outputs hexadecimal.\n');
console.table([
	{ input: '#FFF', output: getHexadecimalOrRGBFrom('#FFF')},
	{ input: '#FFFFFF', output: getHexadecimalOrRGBFrom('#FFFFFF')},
	{ input: 'rgb(255,255,255)', output: getHexadecimalOrRGBFrom('rgb(255,255,255)')},
], ['input','output'])
console.groupEnd();