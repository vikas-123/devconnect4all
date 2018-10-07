import {GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken'
export const registerUser = (userData,history) => dispatch => {
    
    axios.post('/api/users/register',userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
    );
};


export  const loginUser = userData => dispatch => {
    axios.post('/api/users/login' , userData)
    .then(res=> {
        //save to lacal storage
        const {token} =res.data;
        // set token to ls
        localStorage.setItem('jwtToken',token);
        //set token to auth header
        setAuthToken(token);
        //decode token
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
    );
};

//set logged in user

export const setCurrentUser = (decoded)=>{
    return {
        type :SET_CURRENT_USER,
        payload : decoded
    }
};


// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
  