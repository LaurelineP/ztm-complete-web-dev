/* ------------------------------- Question 3 ------------------------------- */
/**
 *  Write a function that converts HEX to RGB.
 * Then Make that function auto-detect the formats so that if you enter
 * HEX color format it returns RGB and if you enter RGB color format it returns HEX.
 * 
 */

function getHexadecimalOrRGBFrom (color) {
	// either hexadecimal or rgb value
	const parseValueColor = value => {
		return /\d/.test(value)
			? parseInt(value)
			: parseInt(value, 16);
		}

	// parse for colors indicators string value
	let colorValuesToProcess = color
		.split(/\W/g)
		.filter(parseValueColor);


	const isHexadecimal = colorValuesToProcess.length === 1
		&& /[a-z]|[A-Z]/.test( colorValuesToProcess[0]);
	const is3Hexadecimal = isHexadecimal && colorValuesToProcess[0].length === 3;
	const is6Hexadecimal = isHexadecimal && colorValuesToProcess[0].length === 6;


	if( is3Hexadecimal ) {
		colorValuesToProcess = [...colorValuesToProcess[0]].map(letter => letter + letter);
	} // --> [ 'fff' ] --> [ 'ff', 'ff', 'ff ]

	else if( is6Hexadecimal ) {
		colorValuesToProcess = [...colorValuesToProcess[0]]
			.reduce((acc, letter, idx, self) => {
			if(idx % 2 === 0) {
				acc.push( letter + self[idx + 1] );
			}
			return acc;
		}, []); // --> [ 'ffffff' ] --> [ 'ff', 'ff', 'ff ]
	}


	const output = isHexadecimal
		? `rgb(${colorValuesToProcess.map(v => parseInt(v,16))})`
		: `#${colorValuesToProcess.map(v => Number(v).toString( 16 ) ).join('')}`;

	return output;
}