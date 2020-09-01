import axios from 'axios';

const API_URL_USR = "http://localhost:5000/api/user"
export async function login_user(email, pass) {
    try {
        const resp = await axios.post(`${API_URL_USR}/login`, {
            email,
            pass
        });

        console.log(resp.headers)

        if (resp.status === 200) {
            const authToken = await resp.data.auth_token;
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

export async function register_user(username, email, pass) {
    try {
        const resp = await axios(`${API_URL_USR}/register`, {
            name: username,
            email,
            pass
        })
        const data = await resp.data;
        if (!data.error) {
            return {
                status: true,
                message: "User Registered"
            }
        } else {
            return {
                status: false,
                messsage: "User Not Registered"
            }
        }

    } catch (error) {
        return {
            status: false,
            message: "error",
            error
        }
    }
}