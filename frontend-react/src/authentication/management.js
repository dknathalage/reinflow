import axios from 'axios';
import {
	API_URL
} from './urls'
const API_ACCESS = `${API_URL}/api/sensors`;
const API_ACCESS_LIGHTS = `${API_URL}/api/lights`;
const API_MANAGE_USERNAME = `${API_URL}/api/manage/update/username`
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

export async function update_username(username) {
	try {
		console.log(username)
		const resp = await axios.post(API_MANAGE_USERNAME, {
			new_username: username
		}, config)
		const data = await resp.data;
		if (data.error) {
			return {
				status: false,
				message: data.error
			}
		} else {
			return {
				status: true,
				message: data.user
			}
		}
	} catch (error) {
		return {
			status: false,
			message: error.message
		}
	}
}