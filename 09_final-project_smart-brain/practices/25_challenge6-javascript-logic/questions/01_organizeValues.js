/**
 * ------------------------------ * Question 1: -----------------------------
 * Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
 * make a function that organizes these into individual array that is ordered.
 * For example answer(ArrayFromAbove) should return:
 * [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591].
 *
 * Bonus: Make it so it organizes strings differently from number types.
 * i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]
 * */
/** Organize duplicates in an array and individuals number - question 1 */
function organizeValues_groupDuplicates(arr) {
	const sortedArr = arr.sort((a, b) => a - b);

	return sortedArr.reduce((output, number, idx) => {
		const innerArr = output.find(val => val?.includes?.(number));

		// mutates the inner array to add similar numbers into the final output
		if (!!innerArr) { innerArr.push(number); }

		else {
			// pushes  an array for similar numbers or the individual number )
			const value = arr[idx + 1] === number ? [number] : number;
			output.push(value);
		}
		return output;
	}, []);
}


/** Organize duplicates in an array and individuals number using the forEach loop - question 1 alternative */
function organizeValues_groupDuplicates_forEach(arr) {
	const sortedArr = arr.sort();
	const output = [];

	sortedArr.forEach((number, idx) => {
		const innerArr = result.find(val => val?.includes?.(number));

		// mutates the inner array in final output
		if (!!innerArr) { innerArr.push(number); }


		// push a new array array if numbers are 
		else if (arr[idx + 1] === number) {
			output.push([number]);
		}

		// push individual number in output
		else { output.push(number); }
	});
	return output;
}

/** Organize types values by array or by individuals and duplicates  - question 1 - bonus complete version */
function organizeValues(arr){
	const isTypedNumber = arr.every( v => typeof v === 'number');
	const sorted = isTypedNumber
		? arr.sort((a, b) => a - b)
		: arr.sort((a) => typeof a === 'number' ? 0 : 1);

	return sorted.reduce((output, value, idx, _arr) => {
		const innerArr = !isTypedNumber
			? output.find( v => v?.every?.( x => typeof x === typeof value ))
			: output.find( v => v?.includes?.(value));
		

		if(!!innerArr){
			// does exist - can mutate
			innerArr.push(value);
		} else {
			// does not exist, should create and/or add value
			const _value = !isTypedNumber || (_arr[idx + 1] === value)
				? [value] : value
			output.push(_value)
		}
		return output;
	},[]);
}