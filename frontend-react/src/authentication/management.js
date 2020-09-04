import axios from 'axios';
import {API_URL} from './urls'
const API_ACCESS = `${API_URL}/api/sensors`;
const config = {
	headers: {
		Authorization: localStorage.getItem('auth-token')
	}
};
export async function add_new_sensor(lat, lon) {
	try {
		const resp = await axios.post(
			`${API_ACCESS}/register`,
			{
				lat,
				lon
			},
			config
		);
		if (resp.status === true) {
			return {
				status: true,
				data: resp.data
			};
		} else {
			return {
				status: false,
				error: resp.error
			};
		}
	} catch (error) {
		return {
			status: false,
			error
		};
	}
}
