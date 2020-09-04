import axios from 'axios';
import {
	API_URL
} from './urls'
const API_ACCESS = `${API_URL}/api/sensors`;
const API_ACCESS_LIGHTS = `${API_URL}/api/lights`;
const config = {
	headers: {
		Authorization: localStorage.getItem('auth-token')
	}
};
export async function add_new_sensor(name, description, lat, lon) {
	console.log(lat, lon)
	try {
		const resp = await axios.post(
			`${API_ACCESS}/register`, {
				sensorName: name,
				sensorDescription: description,
				lat,
				lon
			},
			config
		);
		const data = await resp.data;
		if (data.status === true) {
			return {
				status: true,
				data: data.data
			};
		} else {
			return {
				status: false,
				error: data.error
			};
		}
	} catch (error) {
		return {
			status: false,
			error
		};
	}
}

export async function add_new_light(name, description, lat, lon) {
	try {
		const resp = await axios.post(
			`${API_ACCESS_LIGHTS}/register`, {
				lightName: name,
				lightDescription: description,
				lat,
				lon
			},
			config
		);
		const data = await resp.data;
		if (data.status === true) {
			return {
				status: true,
				data: data.data
			};
		} else {
			return {
				status: false,
				error: data.error
			};
		}
	} catch (error) {
		return {
			status: false,
			error
		};
	}
}