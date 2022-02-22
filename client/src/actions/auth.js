import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        // log in user and navigate to home page
        navigate("/")
    } catch (e) {
        console.log(e.message)
    }
}
export const signup = (formData, navigate) => async(dispatch) => {
    try {
        // register user and navigate to home page
        navigate("/")
    } catch (e) {
        console.log(e.message)
    }
}