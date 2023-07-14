// Solve the below problems:

// #1) Convert the below promise into async await
fetch("https://jsonplaceholder.typicode.com/users/")
  .then((response) => response.json())
  .then(console.log);

const asyncFetch = async () => {
  const req = await fetch('https://jsonplaceholder.typicode.com/users/')
  const res = await req.json();
  const result  = await res;
  console.log('result:', result)
}

// #2) ADVANCED: Update the function below from the video to also have
// async await for this line: fetch(url).then(resp => resp.json())
// So there shouldn't be any .then() calls anymore!
// Don't get discouraged... this is a really tough one...
const urls1 = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  const [users, posts, albums] = await Promise.all(
    urls.map(async (url) => {
      const resp = await fetch(url)
      return await  resp.json()
    })
  );
  console.log("users", users);
  console.log("posta", posts);
  console.log("albums", albums);
};

// #3)Add a try catch block to the #2 solution in order to catch any errors. // Now, use the given array containing an invalid url, so you console.log  //your error with 'oooooops'.
const urls2 = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholdeTYPO.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData2 = async function (){
  try {
    const [users, posts, albums] = Promise.all(
      urls.map( async (url) => {
        const res = await fetch(url);
        return await res.json();
      })
    )
    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);
  } catch( error ){
    console.error( error )
  }
}