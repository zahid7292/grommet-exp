/**
 * Created by razamd on 10/22/2016.
 */

import * as constants from '../actions/constants';

const initialState = {
  ds : [],
  common: {
    "action":1,
    "collectionEnabled": false,
    "pollerName": "local",
    "sslConn": false,
    "encoding": "UTF-8",
    "reportingInterval": 60,
    "requestTimeout": 120,
    "connectionTimeout": 120,
    "retriesCount": 3,
    "authenticationRequested": true,
    "authenticationFlag": false,
    "authFlag": false,
    "selected":true,
    "tagName":"SHRSISIntegrationTag",
    "authenticationUsername": "shrtest",
    "authenticationPassword": "shrtest"
  },
  changing: false
};

export default function dsReducer ( state = initialState, action) {

  let tmp = state.ds;

  switch ( action.type) {
    case constants.ADD_DS : {
      tmp.push(action.payload);
      state = Object.assign({}, state, {ds: tmp});
      break;
    }

    case constants.GET_DS : {
      state = Object.assign({}, state, { ds: action.payload});
      break;
    }
    case constants.CONN_TEST: {
      state = Object.assign({}, state, { ds: action.payload});
      break;
    }
  }
  return state;
}
