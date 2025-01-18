import Clarifai from 'clarifai';
 
export const appClarifai = new Clarifai.App({
	apiKey: process.env.NEXT_PUBLIC_CLARIFAI_APP_API_KEY
})


/* -------------------------------------------------------------------------- */
/*                            WITHOUT CLARIFAI LIB                            */
/* -------------------------------------------------------------------------- */

// TODO: review - probably could be in backend
export const getClarifaiConfig = IMAGE_URL => {

	/* -------------------------------------------------------------------------- */
	/*                                     API                                    */
	/* -------------------------------------------------------------------------- */
	///////////////////////////////////////////////////////////////////////////////////////////////////
	// In this section, we set the user authentication, user and app ID, model details, and the URL
	// of the image we want as an input. Change these strings to run your own example.
	//////////////////////////////////////////////////////////////////////////////////////////////////

	// Your PAT (Personal Access Token) can be found in the portal under Authentification
	const PAT 		= process.env.NEXT_PUBLIC_CLARIFAI_APP_PAT;
	const USER_ID 	= process.env.NEXT_PUBLIC_CLARIFAI_USER_ID;       
	const APP_ID 	= process.env.NEXT_PUBLIC_CLARIFAI_APP_ID;
	
	// [ OPTIONAL ] Change these to whatever model and image URL you want to use
	const MODEL_ID 			= 'face-detection';
	const MODEL_VERSION_ID 	= '6dc7e46bc9124c5c8824be4822abe105';    

	const body = JSON.stringify({
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
		body
	};

}

/**
 * https://docs.clarifai.com/api-guide/predict/images/
 * @param {*} imageUrl 
 * @returns 
 * @docs https://docs.clarifai.com/api-guide/predict/images/
 */
export default async function fetchFaceRecognitions( imageUrl ){
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

		let data = await response.json()
		console.log('data:', data)

		// Gets / Formats boxes regions.region_info list
		data = data.outputs
			.flatMap( o => o.data.regions )
			.map( o => o.region_info.bounding_box)
		return data
	} catch( error ){
		console.error(error)
	}
}
