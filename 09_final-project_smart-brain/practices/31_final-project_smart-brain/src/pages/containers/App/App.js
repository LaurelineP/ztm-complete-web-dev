import { createRef, Component } from 'react';

import { NavigationBar } from '../../components/NavigationBar/NavigationBar';
import { Logo } from '../../components/Logo/Logo';
import { Profile } from '../../components/Profile/Profile';
import { DetectionPanel } from '../../components/DetectionPanel/DetectionPanel';
import { Inter } from 'next/font/google'
import { ParticlesContainer } from '@/pages/components/ParticlesContainer';
import { LinkSearch } from '@/pages/components/LinkSearch/LinkSearch';
import { Canvas } from '../../components/Canvas/Canvas'

import fetchFaceRecognitions, { appClarifai } from '@/services/clarifai.services';

import styles from './App.module.css';
import DetectionBoxes from '@/pages/components/DetectionBoxes';

const inter = Inter({ subsets: ['latin'] })

class App extends Component {
	constructor(props){
		super(props)

		this.pictureRef = createRef(null)

		this.state = {
			imageURL: '',
			isUpdating: false,
			isLoading: false,
			canvasCoordinates: [],
			pictureSize: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
	}

	async onSubmit(e, URL){
		if(!!URL){
			
			this.setState({isLoading: true, imageURL: URL, canvasCoordinates: []})

			// Fetch recognitions boxes
			const response_boundingBoxes = await fetchFaceRecognitions(URL);

			const { height, width } = this.pictureRef.current
			this.setState({ 
				isLoading: false,
				canvasCoordinates: response_boundingBoxes,
				pictureSize: { height, width },
			})
			
		}
	}

	render(){
		const didPictureRendered = !!this.pictureRef?.current

		const isLoading = (this.state.isUpdating || this.state.isLoading)
			&& !didPictureRendered
		
		const {
			canvasCoordinates,
			imageURL,
			pictureSize : { height, width }
		} = this.state
		return(
			<div className={ styles.App }>
				<ParticlesContainer/>
				{/* <NavigationBar>
					<Logo />
					<Profile />
				</NavigationBar> */}

				<main className={styles.App_main}>
					<LinkSearch onSubmit={this.onSubmit} />
					<DetectionPanel>
						{/* ---------------------------------- IMAGE --------------------------------- */}
						 <div id = "picture-detection" className={styles.App_picture_detection}>
							{ isLoading && !isDetectionReady && <span>Loading...</span>  }

								 <div>
									<img
										ref			= { this.pictureRef }
										className 	= { styles.App_Detection_img}
										src 		= { imageURL }
									/>
									<DetectionBoxes
										height 			= { height }
										width 			= { width }
										coordinates 	= { canvasCoordinates }
									/>
								</div>

						</div>
						{/* --------------------------------- DETAILS --------------------------------  */}
						{/* <div id="picture-detection_info">
							details
						</div> */}
					</DetectionPanel>
				</main>
			</div>
		)
	}
}

export default App;