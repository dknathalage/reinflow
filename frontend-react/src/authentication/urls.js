export let API_URL = 'http://panel.sheronsuditha.me:5000'
export const config = {
    headers: {
        Authorization: localStorage.getItem('auth-token')
    }
};

export let API_GET_USERS_URL = `${API_URL}/api/info/users`