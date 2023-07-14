// Solve the below problems:


const dragons = ['Tim', 'Johnathan', 'Sandy', 'Sarah'];

// #1) In the array `dragons`, Check if this array includes the name "John".
console.log('1 -', dragons.includes("John"));




// #2) In the array `dragons`, Check if this array includes any name that 
// has "John" inside of it. If it does, return that
// name or names in an array.
const namesIncludingJohn = dragons.filter( name => name.includes("John"));
console.log('2 -', namesIncludingJohn);





// #3) Create a function that calculates the power of 100 of a number entered as a parameter
const power100 = number => number ** 100;
console.log('3 -', power100);





// #4) Using your function from #3, put in the parameter 10000. What is the result?
// Research for yourself why you get this result
const power100By10000 = power100(10000);
console.log(
	'4 -',
	power100By10000,
	'\n Result explanation: `Infinity` would be displayed as it reach the biggest number computation possible'
);

