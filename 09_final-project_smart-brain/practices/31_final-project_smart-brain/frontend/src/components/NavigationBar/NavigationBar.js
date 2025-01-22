import { Component } from 'react';

import styles from './NavigationBar.module.css';

export class NavigationBar extends Component {
	render(){
		return(
			<nav className={styles.NavigationBar}>
				{this.props.children}
			</nav>
		)
	}
}
