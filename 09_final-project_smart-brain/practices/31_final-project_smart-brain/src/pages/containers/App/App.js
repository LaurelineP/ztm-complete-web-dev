import { createRef, Component } from 'react';

import { NavigationBar } from '../../components/NavigationBar/NavigationBar';
import { Logo } from '../../components/Logo/Logo';
import { Profile } from '../../components/Profile/Profile';
import { DetectionPanel } from '../../components/DetectionPanel/DetectionPanel';
import { Inter } from 'next/font/google'
import { ParticlesContainer } from '@/pages/components/ParticlesContainer';
import { LinkSearch } from '@/pages/components/LinkSearch/LinkSearch';
import { Canvas } from '../../components/Canvas/Canvas'

import configAndFetchPrediction, { appClarifai } from '@/services/client-clarifai';

import styles from './App.module.css';

const inter = Inter({ subsets: ['latin'] })

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			imageURL: '',
			isUpdating: false,
			isLoading: false,
			canvasCoordinates: []
		}

		this.pictureRef = createRef(null)

		this.onSubmit = this.onSubmit.bind(this);
	}

	async onSubmit(e, URL){
		if(!!URL){
			console.log('URL:', URL)
			this.setState({isLoading: true})

			// Clarifai implementation
			const response_boundingBoxes = await configAndFetchPrediction(URL);
			console.log('response_boundingBoxes:', response_boundingBoxes)
			// https://i.pinimg.com/474x/b6/96/c4/b696c434b86185d5fec9d8a16f35a03e.jpg
			this.setState({ 
				imageURL: URL,
				isLoading: false,
				canvasCoordinates: response_boundingBoxes
			})
		}
	}

	// calculate

	render(){
		console.log('pixcurr',this.pictureRef?.current?.getBoundingClientRect())
		return(
			<div className={styles.App}>
				<ParticlesContainer/>
				<NavigationBar>
					<Logo />
					<Profile />
				</NavigationBar>

				<main className={styles.App_main}>
					<LinkSearch onSubmit={this.onSubmit} />
					<DetectionPanel>
						 <div id="picture-detection" className={styles.App_picture_detection}>
							{(this.state.isUpdating || this.state.isLoading) && <span>Loading...</span> }
							<img ref= {this.pictureRef} className = {styles.App_Detection_img} src = { this.state.imageURL } />
							{
								!!this.pictureRef?.current && this.state?.canvasCoordinates?.map( (regionCoordinates, idx) => (
									<Canvas
										key = {`canvas-region-${idx}`}
										boxingBox={regionCoordinates}
										style={{position: 'absolute'}}
										height={this.pictureRef?.current?.height || 0 }
										width={this.pictureRef?.current?.width || 0 }
									/>
								))
							}
						</div>
						<div id="picture-detection_info">
							details
						</div>
					</DetectionPanel>
				</main>
			</div>
		)
	}
}

export default App;