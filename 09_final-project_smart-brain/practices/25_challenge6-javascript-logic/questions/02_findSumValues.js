/* ------------------------------- Question 2: ------------------------------ */
/**
 * Write a javascript function that takes an array of numbers and a target number.
 * The function should find two different numbers in the array that, 
 * when added together, give the target number.
 * For example: answer([1,2,3], 4) should return [1,3]
 * For example: answer([0, 1, 5, 4 ,2, 3, 8], 8) should return [5,3]
 * 
 */
function findSumValues( arr, expectedSum ){
	// predictable values order
	const validNumbers = arr
		.filter(number => (number !== expectedSum) && !!number )
		.sort((a, b) => a - b);

	let customIdx  = 0;
	let result;

	// goes through all the array's values to find numbers that output the `expectedSum`
	validNumbers.forEach( number => {

		/**
		 * keeps looping until values are found
		 * - no refacto to reuse code - breaks the loop
		 */
		while( 
			!result || result?.length <= 0
			&& customIdx <= validNumbers.length - 1
		){
			// if sum is `expectedSum`, save the set of numbers in `result`
			const nextNumber  = validNumbers[ customIdx  ]
			if( number + nextNumber  === expectedSum && number !== nextNumber ){
				result = [number, validNumbers[ customIdx  ]]
			}
			
			// determines if loop restarts or continues
			if( customIdx <= validNumbers.length - 1 ){
				customIdx += 1;
			} else {
				// ends loop for this iteration
				customIdx = 0;
                return;
            }
		}

	})
	return result || null;
}