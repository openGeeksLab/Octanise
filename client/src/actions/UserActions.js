import { LOAD_USER } from './types';
import axios from 'axios';

const regURL = "http://localhost:8000/api/v1/auth/registration";
const loginURL = "http://localhost:8000/api/v1/auth/login";

export function loadUser(user) {
  return {
    type: LOAD_USER,
    payload: user
  }
}

export function registerUser(user) {
  return (dispatch) => {
    axios.post(regURL, user)
    .then(response => {
      dispatch(loadUser(response.data));
    })
    .catch(error => console.log('register error: ', error));
  }
}

export function loginUser(user) {
  return (dispatch) => {
    axios.post(loginURL, user)
    .then(response => {
      dispatch(loadUser(response.data));
    })
    .catch(error => console.log('login error: ', error));
  }
}
