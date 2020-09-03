const initialState = {
    auth_status: false,
    username: null,
    user_id: null,
    accesslevel: null,
    location: []
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
                accesslevel: payload.accessLevel,
                user_id: payload.user_id,
                location: payload.location
            };
            break;
        case 'LOGOUT_USR':
            return state = {
                auth_status: false,
                username: null,
                user_id: null,
                accesslevel: null,
                location: []
            };
        default:
            return state;
    }
}