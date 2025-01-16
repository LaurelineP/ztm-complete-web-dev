import { createRef, Component } from "react"

export class Canvas extends Component {
	constructor(props){
		super(props)

		this.canvasRef = createRef(null);
		this.canvasCtx = this.canvasRef?.current?.getContext('2d');

	}

	componentDidUpdate(){
		console.log('thisctx', this?.canvasCtx)
		// this.canvasCtx.strokeRect(...this.props.boxingBox);
		
	}
	render(){
		return !!this.props.boxingBox.length
			? <canvas ref={this.canvasRef} height={this.props?.height} width ={this.props?.width}/>
			: null 
	}
}