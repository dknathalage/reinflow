import axios from 'axios';
import {
	API_GET_USERS_URL,
	API_GET_SENSORS,
	API_GET_TRAFFIC_LIGHTS,
	API_GET_SPEC_USER,
	API_GET_LIGHT
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

export async function get_spec_user(userId) {
	try {
		const resp = await axios.post(`${API_GET_SPEC_USER}/${userId}`, null);
		const data = await resp.data;
		if (data.status === true) {
			return {
				status: true,
				user: data.user
			}
		} else {
			return {
				status: false,
				message: data.message
			}
		}
	} catch (error) {
		return {
			status: false,
			error: error.message
		}
	}
}

export async function get_light(lightid) {
	try {
		const resp = await axios.post(`${API_GET_LIGHT}/${lightid}`, null);
		const data = await resp.data;
		if (data.status === true) {
			return {
				status: true,
				light: data.light
			}
		} else {
			return {
				status: false,
				message: data.message
			}
		}
	} catch (error) {
		return {
			status: false,
			error: error.message
		}
	}
}