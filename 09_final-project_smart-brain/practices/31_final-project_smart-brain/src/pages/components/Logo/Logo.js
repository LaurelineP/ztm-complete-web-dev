import { Component } from 'react'
import Tilt from 'react-parallax-tilt';
import styles from './Logo.module.css';
import logo from '../../../assets/noun-lens-5529936.svg'
import Image from "next/image";

export class Logo extends Component {
	render(){
		return(
			<Tilt>
				<div  className={styles.Logo}>
					<Image src={logo} width={45} alt={""}/>
				</div>
			</Tilt>
		)
	}
}
