import { createRef, Component } from "react"
import {
	renderBoxes,
	clearBoxes,
	calculateBox
} from './detection-boxes.helpers'

import styles from './DetectionBoxes.module.css'


// loco

export default class DetectionBoxes extends Component {
	constructor(props){
		super(props)
		this.ref = createRef(null)
	}


	componentDidUpdate(){
	 	clearBoxes( this.props )
		renderBoxes(
			this.ref.current,
			calculateBox( this.props )
		)
	}
	render(){
		return (
			<canvas 
				ref			= { this.ref }
				height		= { this.props.height }
				width 		= { this.props.width }	
				className	= { styles.DetectionBoxes }
			/>
		)
	}
	
	
}