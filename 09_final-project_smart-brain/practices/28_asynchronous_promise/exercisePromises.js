// Solve the questions below:

// #1) Create a promise that resolves in 4 seconds and returns "success" string
const promise4s = new Promise((resolve, reject) => {
  setTimeout( resolve, 4_000, 'success');
});


// #2) Run the above promise and make it console.log "success"
const result5s = promise
  .then( console.log )
  .catch( error => console.error(error))


// #3) Read about Promise.resolve() and Promise.reject(). How can you make
// the above promise shorter with Promise.resolve() and console loggin "success"
const promise4s2 = new Promise.resolve(setTimeout(console.log, 4_000, 'success!'))
promise4s2.then(console.log)


// #4) Catch this error and console log 'Ooops something went wrong'
const rejected = Promise.reject('failed');
rejected.catch( error => console.error('Oops, something went wrong!'));


// #5) Use Promise.all to fetch all of these people from Star Wars (SWAPI) at the same time.
// Console.log the output and make sure it has a catch block as well.
const urls = [
  'http://swapi.dev/api/people/1',
  'http://swapi.dev/api/people/2',
  'http://swapi.dev/api/people/3',
  'http://swapi.dev/api/people/4'
]

const promises = Promise.all(urls.map( url => fetch(url).then( res => res.json())))
promises
  .then( console.info )
  .catch( console.error );


// #6) Change one of your urls above to make it incorrect and fail the promise
// does your catch block handle it?
const promiseWReject = Promise.all( urls.map( url => fetch(url + 1).then( res => res.json())))
promiseWReject
  .then( console.info )
  .then( console.error );