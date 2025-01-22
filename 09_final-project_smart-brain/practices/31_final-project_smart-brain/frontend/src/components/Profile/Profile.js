import { Component } from 'react'
import styles from './Profile.module.css';
import { Dropdown } from '../Dropdown/Dropdown';

export class Profile extends Component {
	render(){
		return(
			<div>
				<div className={styles.Profile}>
					Profile
				</div>
				<Dropdown>
					<li>lala</li>
				</Dropdown>
			</div>
		)
	}
}
