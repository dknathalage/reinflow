import axios from 'axios';
import {
	API_GET_USERS_URL,
	API_GET_SENSORS,
	API_GET_TRAFFIC_LIGHTS
} from './urls';

export async function get_registered_users() {
	try {
		const resp = await axios.post(API_GET_USERS_URL, null);
		const data = await resp.data;
		if (data.status === true) {
			const systemUsers = data.users;
			return systemUsers;
		} else {
			return {
				status: false,
				message: data.message
			};
		}
	} catch (error) {
		return {
			status: false,
			message: error.message
		};
	}
}


export async function get_registered_sensors() {
	try {
		const resp = await axios.post(API_GET_SENSORS, null);
		const data = await resp.data;
		if (data.status === true) {
			return {
				status: true,
				sensors: data.sensors
			}
		} else {
			return {
				status: false,
				message: data.error
			}
		}
	} catch (error) {
		console.log(error)
		return {
			status: false,
			message: error.message
		}
	}
}

export async function get_registered_trafficlights() {
	try {
		const resp = await axios.post(API_GET_TRAFFIC_LIGHTS, null);
		const data = await resp.data;
		console.log("lightData", data);
		if (data.status === true) {
			return {
				status: true,
				lights: data.lights
			}
		} else {
			return {
				status: false,
				message: data.error
			}
		}
	} catch (error) {
		console.log(error)
		return {
			status: false,
			message: error.message
		}
	}
}