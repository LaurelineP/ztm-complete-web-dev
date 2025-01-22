
import Link from "next/link"
import { ParticlesBackground } from "../ParticlesBackground/ParticlesBackground"
import { NavigationBar } from "../NavigationBar/NavigationBar"
import { Inter } from 'next/font/google'
 
const inter = Inter({
	subsets: ['latin'],
  	display: 'swap',
});
 

import styles from './Layout.module.css'
 
export default function Layout({ children }) {
	const clss = `${styles.Layout} ${inter.className}`
	return (
		<div className = {clss}>

			<ParticlesBackground/>

			<NavigationBar>
				<ul>
					<Link href="/signin">signin</Link>
					<Link href="/signup">signup</Link>
				</ul>
			</NavigationBar>


			<main>{children}</main>
	
		</div>
	)
}