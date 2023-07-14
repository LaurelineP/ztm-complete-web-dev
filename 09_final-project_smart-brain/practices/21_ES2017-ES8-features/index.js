// Solve the below problems:

// #1) Line up the Turtle and the Rabbit at the start line:
const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';

/* --------------------------------- ANSWER --------------------------------- */
turtle = turtle.padStart(startLine.length - startLine.trim().length + 2);
rabbit = rabbit.padStart(startLine.length - startLine.trim().length + 2);

/* ------------------------------------ - ----------------------------------- */

// it should look like this:
'     ||<- Start line'
'       🐢'
'       🐇'

// when you do:
console.log(startLine);
console.log(turtle);
console.log(rabbit);
console.log('1 - Answer\'s output:\n', startLine, '\n', turtle, '\n', rabbit, '\n', );



// #2) What happens when you run turtle.trim().padEnd(9, '=') on the turtle variable
// Read about what the second parameter does in padEnd and padStart
turtle = turtle.trim().padEnd(9, '=');

/* --------------------------------- ANSWER --------------------------------- */
// Answer: "🐢========" 
// Interpretation: turtle runs :D 
// correction: no error
console.log('2 - Answer\'s output:', turtle);

/* ------------------------------------ - ----------------------------------- */



// #3) Get the below object to go from:
let obj = {
  my: 'name',
  is: 'Rudolf',
  the: 'raindeer'
}
// to this:
'my name is Rudolf the raindeer'
/* --------------------------------- ANSWER --------------------------------- */
let result = Object.entries(obj).flat().join(' ');
console.log('3 - Answer\'s output:', result);
/* ------------------------------------ - ----------------------------------- */
