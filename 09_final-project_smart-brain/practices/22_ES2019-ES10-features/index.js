// Solve the below questions:
let result;


// #1 Turn this array into the new array as followed [1,2,3,[4],[5]]. Bonus if you can do it on one line
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
result = array.flat();
console.info('1. result:', result);



// #2 Turn this array into the new array: [ 'Hello young grasshopper!', 'you are', 'learning fast!' ]
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
result = greeting.flatMap( arr => arr.join(' '));
console.info('2. result:', result);



//#3 Turn the greeting array above into a string: 'Hello young grasshopper! you are learning fast!'
result = result.join(' ');
console.info('3. result:', result);


//#4 Turn the trapped 3 number into: [3]
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
result = trapped.flat(Infinity);
console.info('4. result:', result);



//#5 Clean up this email to have no white spaces. Make the answer be in a single line (return a new string):
const userEmail3 = '     cannotfillemailformcorrectly@gmail.com   '
result = userEmail3.trim();
console.info('5. result:', result);



//#6 Turn the below users (value is their ID number) into an array: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]
const users = { user1: 18273, user2: 92833, user3: 90315 };
result = Object.entries(users);
console.info('6. result:', result);



//#7 change the output array of the above to have the user's IDs multiplied by 2 -- Should output:[ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]
result = result.flatMap( arr => { arr[1] = arr[1] * 2; return [arr];});
console.info('7. result:', result);



//#8 change the output array of question #7 back into an object with all the users IDs updated to their new version. Should output: { user1: 36546, user2: 185666, user3: 180630 }
result = Object.fromEntries( result );
console.info('8. result:', result);
