import { Component, createRef } from 'react';
import styles from './LinkSearch.module.css'

export class LinkSearch extends Component {
	constructor(props){
		super(props)

		this.inputRef = createRef('');
		this.onSubmitValue = this.onSubmitValue.bind(this);
	}

	onSubmitValue(e){
		const URL = this.inputRef.current.value
		if(e.type === 'keydown' && e.key !== 'Enter' || !URL ) return;
		console.log('eh', this.inputRef.current.value )
		this.props.onSubmit(e, URL)
	}

	render(){
		return(
			<div className = {styles.LinkSearch}>
				<input
					className = {styles.LinkSearch_input}
					ref={this.inputRef}
					type="text"
					onKeyDown={this.onSubmitValue}
					placeholder={this.props.placeholder}
				/>
				<button
					onClick={this.onSubmitValue}
					className = {styles.LinkSearch_button}
					>
					<span>Detect</span>
				</button>
			</div>
		)
	}
}