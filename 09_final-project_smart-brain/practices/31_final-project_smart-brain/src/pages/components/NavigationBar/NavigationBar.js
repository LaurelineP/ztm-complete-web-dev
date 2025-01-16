import { Component } from 'react';

import styles from './NavigationBar.module.css';

export class NavigationBar extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className={styles.NavigationBar}>
				{this.props.children}
			</div>
		)
	}
}
