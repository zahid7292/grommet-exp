import axios from "axios";

export function authUser(username,password) {
  console.log(username, " ", password);
  return function ( dispatch ) {
    axios.post('https://15.114.242.14:21412/AdminService/v1/LogonResource', {
      "userName":username,
      "password":password,
      "clientCompName":""
    }).then((response) => {
      console.log(response);
    }).catch( (err) => {
      console.log(err);
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
