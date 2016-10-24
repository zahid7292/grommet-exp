/**
 * Created by razamd on 10/22/2016.
 */
import * as constants from "./constants";
import axios from 'axios';

export function addDatasource (ds, common) {
  ds = Object.assign({}, ds, common, {id: Date.now(), local: true});
  console.log('Inside addDatasource');
  return { type: constants.ADD_DS, payload: ds };
}

export function getDatasources(token) {
  console.log('Inside getDatasources');
  const config = {
    headers: { "Token": token}
  };

  return function (dispatch) {
    axios.get('https://15.114.242.14:21412/AdminService/v1/SiteScopes', config)
      .then( (response) => {
        dispatch({
          type: constants.GET_DS,
          payload: response.data.sitescopeDatabase
        });
        console.log(response.data.sitescopeDatabase);
      }).catch( (err) => {
        console.log(err);
      });
  };
}

export function saveDatasource( ds, token ) {
  console.log('Inside saveDatasource');

  const config = {

    headers: {
      "Token": token,
      "Content-Type": 'application/json'
    }
  };

  if (ds.local) {
    ds.id = null;
    delete ds.local;

    const data = JSON.stringify(ds);
    console.log(token);
    console.log(data);
    axios.post(
      'https://15.114.242.14:21412/AdminService/v1/SiteScopes',
      data,
      config
    ).then( (response) => {
      console.log(response);
      getDatasources(token);
    }).catch( (err) => {
      console.log("Some Error Occured!");
      console.log(err);
    });

  }else{
    console.log('Remote DataSource');
  }
}

export function deleteDatasource( id, token ) {
  console.log('Inside deleteDatasource');

  const config = {
    headers: { "Token": token}
  };

  axios.delete(
    'https://15.114.242.14:21412/AdminService/v1/SiteScopes/' + id,
    config
  ).then( (response) => {
    console.log(response.data);
    getDatasources(token);
  }).catch( (err) => {
    console.log(err);
  });
}

export function testDSConnetion (ds,token) {
  console.log('Inside testDSConnetion');
  const config = {
    headers: {
      "Token": token,
      "Content-Type": 'application/json'
    }
  };
  delete ds.local;
  const data = JSON.stringify(ds);
  console.log(data);

  return function (dispatch) {
    console.log("Check");
    axios.post(
      'https://15.114.242.14:21412/AdminService/v1/SiteScopes/Connection',
      data,
      config
    ).then( (response) => {
      console.log(response.data);
      ds.connStatus = true;
      dispatch({type: constants.CONN_TEST, payload: ds});
    }).catch( (err) => {
      console.log("Some Error Occured!");
      console.log(err);
    });
  };

/*  return function (dispatch) {
    console.log('Check');
    axios.post(
      'https://15.114.242.14:21412/AdminService/v1/SiteScopes/Connection',
      data,
      config
    ).then( (response) => {
      console.log(response.data);
      ds.connStatus = true;
      dispatch({type: constants.CONN_TEST, payload: ds});
    }).catch( (err) => {
      console.log("Some Error Occured!");
      console.log(err);
    });
  };*/

}
