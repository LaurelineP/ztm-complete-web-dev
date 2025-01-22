import { createRef, Component } from 'react';

import { DetectionPanel } 		from '@/components/DetectionPanel/DetectionPanel';
import { LinkSearch } 			from '@/components/LinkSearch/LinkSearch';
import AuthForm 				from '@/components/AuthForm/AuthForm';
import DetectionBoxes 			from '@/components/DetectionBoxes';

import fetchFaceRecognitions, { appClarifai } from '@/services/clarifai.services';

import styles from './App.module.css';


class App extends Component {
	constructor(props){
		super(props)

		this.pictureRef = createRef(null)

		this.state = {
			isLogged: false,
			/* ------------------------------------ - ----------------------------------- */
			imageURL: '',
			isUpdating: false,
			isLoading: false,
			canvasCoordinates: [],
			pictureSize: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.setIsLoggerd = this.setIsLogged
	}

	async onSubmit(e, URL){
		if(!!URL){
			
			this.setState({ isLoading: true, imageURL: URL, canvasCoordinates: []})

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

	setIsLogged( isLogged ){
		this.setState({
			...this.state,
			isLogged
		})
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

				<main className={styles.App_main}>
					{ this.state.isLogged 
						// --------------------------------- FEATURE --------------------------------
						? (
							<>
								<LinkSearch onSubmit={this.onSubmit} />
								<DetectionPanel>
									{/* ---------------------------------- IMAGE --------------------------------- */}
									<div
										id = "picture-detection"
										className = { styles.App_picture_detection }>
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
							</>
						)
						
						// --------------------------- AUTH ( signin / signup ) ------------------------- 
						: ( 
							<AuthForm
								page 		= "signin"
								setIsLogged = { this.setIsLogged }
							/>
						)
					}
				</main>
			</div>
		)
	}
}

export default App;