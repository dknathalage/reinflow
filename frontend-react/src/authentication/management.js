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
export async function add_new_sensor(lat, lon) {
	console.log(lat, lon)
	try {
		const resp = await axios.post(
			`${API_ACCESS}/register`, {
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

export async function add_new_light(lat, lon) {
	try {
		const resp = await axios.post(
			`${API_ACCESS_LIGHTS}/register`, {
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