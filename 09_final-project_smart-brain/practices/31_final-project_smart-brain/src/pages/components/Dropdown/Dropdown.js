import { Component } from 'react'
import styles from './Dropdown.module.css'

export class Dropdown extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<ul className={styles.Dropdown}>
				{this.props.children}
			</ul>
		)
	}
}
