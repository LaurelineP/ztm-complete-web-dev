/* -------------------------------------------------------------------------- */
/*                             ADVANCED FUNCTIONS                             */
/* -------------------------------------------------------------------------- */


//Solve these problems:

//#1 Create a one line function that adds adds two parameters
const add = (a, b) => a + b; // if arrow function is implied
const add_currying = (a) => (b) => a + b; // if currying is implied


//Closure: What does the last line return?
const addTo = x => y => x + y
var addToTen = addTo(10)
addToTen(3) // 13


//Currying: What does the last line return?
const sum1 = (a, b) => a + b
const curriedSum1 = (a) => (b) => a + b
curriedSum1(30)(1) // 31


//Currying: What does the last line return?
const sum2 = (a, b) => a + b
const curriedSum2 = (a) => (b) => a + b
const add5_1 = curriedSum2(5)
add5_1(12) // 17


//Composing: What does the last line return?
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
compose(add1, add5)(10) //16


//What are the two elements of a pure function?
/**
 * - avoids side effects
 * - for a same input the function should always return the same output
 * 
 * ----- correction as the last one lack of spec
 * 1. Deterministic --> always produces the same results given the same inputs
 * 2. No Side Effects -->  It does not depend on any state, or data, change during a program’s execution. It must only depend on its input elements.
 */