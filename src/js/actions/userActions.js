import axios from "axios";

import { AUTH_PROGRESS, AUTH_SUCCESS, AUTH_FAIL } from './constants';

export function authUser(username,password) {

  return function ( dispatch ) {

    dispatch({type: AUTH_PROGRESS});

    axios.post('https://15.114.242.14:21412/AdminService/v1/LogonResource', {
      "userName":username,
      "password":password,
      "clientCompName":""
    }).then((response) => {
      dispatch({type: AUTH_SUCCESS, token: response.data.logonToken});
    }).catch( (err) => {
      console.log(err);
      dispatch({type: AUTH_FAIL, error: err});
    });
  };
  /*
  return {
    type: "AUTH_USER",
    payload: {
      username,
      password
    }
  }*/
}
