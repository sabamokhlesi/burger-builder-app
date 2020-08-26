import * as actionTypes from './actiontypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDryoOS67yn0CkMq5FZ7oRVgucjsWKoDU';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDryoOS67yn0CkMq5FZ7oRVgucjsWKoDU';
        }
        axios.post(url,authData)
        .then(res =>{
            console.log(res)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            console.log(err) 
            dispatch(authFail(err))
        })
    };
};