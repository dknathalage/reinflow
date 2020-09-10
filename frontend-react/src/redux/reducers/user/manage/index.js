const initialState = {
    user_id: null,
    _id: null,
    name: null,
    email: null,
    accessLevel: null
}

export default function manage_user(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case 'MANAGE_USER':
            return state = {
                user_id: payload.userid,
                _id: payload.userid,
                name: payload.name,
                email: payload.email,
                accessLevel: payload.accessLevel
            };
            break;
        default:
            return state;
    }
}