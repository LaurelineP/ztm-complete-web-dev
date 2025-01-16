import { Component } from 'react'
import styles from './DetectionPanel.module.css'

export class DetectionPanel extends Component {
	render(){
		console.log('details', this.props.details)
		return(
			<div className={styles.DetectionPanel}>
				{this.props.children}
			</div>
		)
	}
}