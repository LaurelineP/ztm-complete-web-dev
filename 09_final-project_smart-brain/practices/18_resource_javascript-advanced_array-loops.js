// Complete the below questions using this array:
const array = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },

];

//Create an array using forEach that has all the usernames with a "!" to each of the usernames
const newArr = [];
array.forEach( user => {
  user.username = `${user.username}!`;
  newArr.push(user); // if we should return the object with the name modified
  // newArr.push(user.username); // if we should return only the username modified
});


//Create an array using map that has all the usernames with a "? to each of the usernames
const mapArray = array.map( user => `${user.username}?` );

//Filter the array to only include users who are on team: red
const filteredArray = array.filter( user => user.team === 'red' );



//Find out the total score of all users using reduce
const score = array.reduce((acc, user) => {
  return acc + user.score;
}, 0)


// (1), what is the value of i? --> 71
// (2), Make this map function pure:
// const arrayNum = [1, 2, 4, 5, 8, 9];
// const newArray = arrayNum.map((num, i) => {
// 	console.log(num, i);
// 	alert(num);
// 	return num * 2;
// })

// pure
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
  // removing all external function
	// console.log(num, i);
	// alert(num);
	return num * 2;
})



//BONUS: create a new list with all user information, but add "!" to the end of each items they own.
const list = array.map( user => {
  user.items.forEach((item,idx, arr) => arr[idx] = `${item}!`);
  return user;
})