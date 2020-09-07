export let API_URL = 'https://reinflow-backend.vercel.app'
export const config = {
    headers: {
        Authorization: localStorage.getItem('auth-token')
    }
};

export let API_GET_USERS_URL = `${API_URL}/api/info/users`