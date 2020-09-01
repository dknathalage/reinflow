import axios from 'axios';

const API_URL_USR = "http://localhost:5000/api/user"
export async function login_user(email, pass) {
    try {
        const resp = await axios.post(`${API_URL_USR}/login`, {
            email,
            pass
        });

        if (resp.status === 200) {
            const authToken = await resp.headers.auth_token;
            console.log(authToken)
            return {
                token: authToken,
                username: resp.data.username,
                accessLevel: resp.data.access_level,
                status: 200
            }
        }
        return {
            status: 403
        }
    } catch (error) {
        return {
            status: 403
        }
    }
}