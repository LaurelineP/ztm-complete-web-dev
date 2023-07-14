// Exercise 1: what do you think the MIN_SAFE_INTEGER is?
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER) // -9007199254740991

// Exercise 2: why does this throw an error? How can you fix it?
// 3 + 4 + 1n
/** Answer: probably because integer and bigInt cannot be computed 
 * together, we need to add n for each integer to calculate them
 * --> 3n + 4n + 1n
 *  */

// Exercise 3: Clean up this code using optional chaining
let will_pokemon = {
    pikachu: {
        species: 'Mouse Pokemon',
        height: 0.4,
        weight: 6,
        power: 'lightning',
        friend: { 
            charizard: {
                species: 'Dragon Pokemon',
                height: 1.7,
                weight: 90.5,
                power: 'fire'
            }
        }
    }
}

let andrei_pokemon = {
    raichu: {
        species: 'Mouse Pokemon',
        height: 0.8,
        weight: 30,
        power: ''
    }
}
// original code
// if (andrei_pokemon && andrei_pokemon.raichu && will_pokemon 
//     && will_pokemon.pikachu && will_pokemon.pikachu.friend 
//     && will_pokemon.pikachu.friend.charizard) {
//         console.info('fight!')
//     } else {
//         console.info('walk away...')
//     }

// Answer - implementation
if (andrei_pokemon?.raichu && will_pokemon.pikachu?.friend?.charizard ) {
      console.info('fight!')
} else {
    console.info('walk away...')
}



// Exercise 4: What do these each output?
console.info(false ?? 'hellooo') // Answer: false
console.info(null ?? 'hellooo') // Answer: 'hellooo'
console.info(null || 'hellooo') // Answer: 'hellooo'
console.info((false || null) ?? 'hellooo') // Answer: 'hellooo'
console.info(null ?? (false || 'hellooo')) // Answer: 'hellooo'