import axios from 'axios';
import { API_GET_USERS_URL, config } from './urls';

export async function get_registered_users() {
	try {
		const resp = await axios.post(API_GET_USERS_URL, null, config);
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
