
/* -------------------------------------------------------------------------- */
/*                                   SHAPES                                   */
/* -------------------------------------------------------------------------- */



export const drawRectangle = ( canvas2DContext, { x, y, w, h } ) => {
	canvas2DContext.strokeRect(x, y, w, h)
}

export const drawCircular = (canvas2DContext, { x,y,w,h }, radius = 50 ) => {
	canvas2DContext.beginPath();
	canvas2DContext.roundRect( x, y, w, h, [ radius ])
	canvas2DContext.stroke();
}

/* ------------------------------------ - ----------------------------------- */ 
export const shapeDrawer = {
	circle: drawCircular,
	rectangle: drawRectangle
}

/* -------------------------------------------------------------------------- */
/*                               CANVAS ACTIONS                               */
/* -------------------------------------------------------------------------- */

export const draw = ( coordinatesBox ) => {
	return ( canvas2DContext, shape = 'circle', radius = 50 ) => {

		shapeDrawer?.[ shape ]?.(
			canvas2DContext,
			coordinatesBox,
			radius
		)
	}
}

export const renderBoxes = (ref, boxCoordinatesList) => {
	if( !!boxCoordinatesList?.length ){
		const canvas2DContext = ref.getContext('2d')
		canvas2DContext.strokeStyle = 'cyan'

		const drawBox = coord => {
			draw(coord)( canvas2DContext, 'circle', 25 )
		}

		boxCoordinatesList.forEach( drawBox )


	}
}

export const clearBoxes = (ref) => {
	ref?.current
		?.getContext('2d')
			?.clearRect?.(0, 0, this.props.width, this.props.height);
}


/* -------------------------------------------------------------------------- */
/*                               COMPUTATIONS                                 */
/* -------------------------------------------------------------------------- */

export const calculateBox = (details) =>{
	const { height, width, coordinates } = details
	let boxes = []
	if( !!coordinates?.length ){
		boxes = coordinates.map( coord => ({
			x: coord.left_col * width,
			y: coord.top_row * height,
			w: (coord.right_col * width) - (coord.left_col * width),
			h: (coord.bottom_row * height) - (coord.top_row * height),
		}))
	}
	return boxes;
}

