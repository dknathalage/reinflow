import axios from 'axios';
import {
	API_ADD_NEW_SENSOR,
	API_UPDATE_COORDS,
	API_UPDATE_PASSWORD,
	API_URL,
	API_USER_SETLEVEL
} from './urls'
const API_ACCESS = `${API_URL}/api/sensors`;
const API_ACCESS_LIGHTS = `${API_URL}/api/lights`;
const API_MANAGE_USERNAME = `${API_URL}/api/l3/namechange/`
const config = {
	headers: {
		Authorization: localStorage.getItem('auth-token')
	}
};


export async function add_new_sensor(name, description, lat, lon) {
	console.log(lat, lon)
	try {
		const resp = await axios.post(
			`${API_ADD_NEW_SENSOR}`, {
				sensorName: name,
				sensorDescription: description,
				lat,
				lon
			}
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


export async function user_accesslevels(id, level) {
	try {
		console.log("id", id)
		const resp = await axios.post(`${API_USER_SETLEVEL}/${id}/${level}`, null);
		const data = await resp.data;
		if (data.status === true) {
			return {
				status: true,
				message: data.message
			}
		} else {
			return {
				status: false,
				message: "Something happened."
			}
		}
	} catch (error) {
		return {
			status: false,
			error: error.message
		}
	}
}

export async function set_coords(username, starting, ending, coords) {
	try {
		const token = localStorage.getItem('auth-token')
		const body = {
			"test": "test1"
		}
		const resp = await axios.post(`${API_UPDATE_COORDS}/${token}/${username}`, {
			start_point: starting,
			end_point: ending,
			coords
		});
		if (await resp.data.status === true) {
			return {
				status: true,
				mesage: "Action Logged"
			}
		} else {
			return {
				status: false,
				message: await resp.data.error
			}
		}
	} catch (error) {
		return {
			status: false,
			message: error.message
		}
	}
}

export async function update_django(coords) {
	const resp = await axios.post('http://localhost:8000/light', coords);
	console.log("logged to django");
}


export async function update_password(newpassword) {
	const resp = await axios.post(`${API_UPDATE_PASSWORD}/${newpassword}`, null);
	const data = await resp.data;
	if (data.status === true) {
		return {
			status: true,
			message: "Password Updated"
		}
	} else {
		return {
			status: false,
			message: data.error
		}
	}
}