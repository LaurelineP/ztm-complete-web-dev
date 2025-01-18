import { getClarifaiConfig } from '../../services/clarifai.services'

// filepath: /Users/laurelineparis/Desktop/CODE/ztm/ztm-complete-web-developer/09_final-project_smart-brain/pages/api/clarifai.js
// import fetch from 'node-fetch';

// Syntax: https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// const requestString = "https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs";
// const endpoint = "https://api.clarifai.com/v2/models/face-detection/outputs";
// this will default to the latest version_id
const endpoint = "https://api.clarifai.com/v2/models/face-detection/outputs";




export default async function handler(req, res) {
	const { imageUrl } = req.body
	const clarifaiConfigReq = getClarifaiConfig(imageUrl)
  	if (req.method === 'POST') {
		try {
			const response = await fetch(endpoint, clarifaiConfigReq);
			const data = await response.json();
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}