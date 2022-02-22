import { AUTH, LOG_OUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, errors: null };
        case LOG_OUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
}

export default authReducer