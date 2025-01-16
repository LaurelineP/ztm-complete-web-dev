import Clarifai from 'clarifai';
 
export const appClarifai = new Clarifai.App({
	apiKey: process.env.NEXT_PUBLIC_CLARIFAI_APP_API_KEY
})

// TODO: review - probably could be in backend
export const getClarifaiConfig = imageUrl => {

	 	/* -------------------------------------------------------------------------- */
	 	/*                                     API                                    */
	 	/* -------------------------------------------------------------------------- */
	 ///////////////////////////////////////////////////////////////////////////////////////////////////
		// In this section, we set the user authentication, user and app ID, model details, and the URL
		// of the image we want as an input. Change these strings to run your own example.
		//////////////////////////////////////////////////////////////////////////////////////////////////
	
		// Your PAT (Personal Access Token) can be found in the portal under Authentification
		const PAT = process.env.NEXT_PUBLIC_CLARIFAI_APP_PAT;
		// Specify the correct user_id/app_id pairings
		// Since you're making inferences outside your app's scope
		const USER_ID = process.env.NEXT_PUBLIC_CLARIFAI_USER_ID;       
		const APP_ID = process.env.NEXT_PUBLIC_CLARIFAI_APP_ID;
		const IMAGE_URL = imageUrl;
		// [ OPTIONAL ] Change these to whatever model and image URL you want to use
		// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
		const MODEL_ID = 'face-detection';
		// const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
	
		///////////////////////////////////////////////////////////////////////////////////
		// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
		///////////////////////////////////////////////////////////////////////////////////

		const raw = JSON.stringify({
			"user_app_id": {
				"user_id": USER_ID,
				"app_id": APP_ID
			},
			"inputs": [
				{
					"data": {
						"image": {
							"url": IMAGE_URL
						}
					}
				}
			]
		});
	
		return {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Authorization': 'Key ' + PAT,
			},
			body: raw
		};

}

/**
 * https://docs.clarifai.com/api-guide/predict/images/
 * @param {*} imageUrl 
 * @returns 
 * @docs https://docs.clarifai.com/api-guide/predict/images/
 */
export default async function configAndFetchPrediction( imageUrl ){
	try {
		const response = await fetch('/api/clarifai', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', 
			},
			body: JSON.stringify({ imageUrl })
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		// loading only one picture at a time: we want outputs[0]
		let data = await response.json()
		data = data.outputs
			.flatMap( o => o.data.regions )
			.map( o => Object.values(o.region_info.bounding_box))
		return data
	} catch( error ){
		console.error(error)
	}
 }
