import { createRef, Component } from "react"
import styles from './Canvas.module.css'

export class Canvas extends Component {
	constructor(props){
		super(props)
		this.canvasRef = createRef(null);
	}


	calculateBoxPosition( data ){
		console.log('\n🔥 --- FN: CALCULATE BOX POS ')

		const height 	= data.height
		const width 	= data.width
		const dataBox 	= data.box
	
		const box = {
			x: dataBox.left_col * width,
			y: dataBox.top_row * height,
			w: (dataBox.right_col * width) - (dataBox.left_col * width),
			h: (dataBox.bottom_row * height) - (dataBox.top_row * height),
		}

		const picture = { height, width }
		return { picture, box }
	}

	displayBox(){
		
		const { picture, box } = this.calculateBoxPosition(this.props)
		try {
			if( !picture.height || !picture.width ){
				throw new Error( 'Box Display: Failed. Missing dimensions' )
			}

			const _canvasCTX = this.canvasRef?.current?.getContext('2d')

			const { x, y, w, h } = box
			_canvasCTX.strokeStyle = "cyan";
			_canvasCTX.strokeRect(x, y, w, h);
		}
		catch( error ){
			console.error( error )
			return
		}
	}


	componentDidMount(){
		console.log(' 🔥 --- C O M P O N E N T - D I D - M O U N T ---')
		this.displayBox()

	}

	componentDidUpdate(){
		this.displayBox()
	}


	// componentWillUnmount(){
	// 	this.canvasRef = createRef(null)
	// }

	render(){
		console.log('\n🔥 --- R E N D E R --- ')
		return (
			<canvas 
				ref			= { this.canvasRef }
				height		= { this.props.height }
				width 		= { this.props.width }	
				className	= { styles.Canvas }
			/>
		)
	}
}