const initialState = {
    auth_status: false,
    username: null,
    accesslevel: null
}

export default function user_state(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case 'LOGIN_USR':
            return state = {
                auth_status: payload.auth_status,
                username: payload.username,
                accesslevel: payload.accesslevel
            };
        default:
            return state;
    }
}