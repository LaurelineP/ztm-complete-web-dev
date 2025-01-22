import { Component } from 'react'
import styles from './DetectionPanel.module.css'

export class DetectionPanel extends Component {
	render(){
		return(
			<div className={styles.DetectionPanel}>
				<div className={styles.DetectionPanel_container}>
					{this.props.children}
				</div>
			</div>
		)
	}
}