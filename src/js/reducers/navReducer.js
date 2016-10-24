/**
 * Created by razamd on 10/22/2016.
 */
import { NAV_ACTIVATE } from "../actions/constants";

const initialState = {
  active: true,
  items:[
    { path: '/', label: 'Dashboard'},
    { path: '/ds_config', label: 'Data Source Configuration'}
  ]
};

export default function navReducer ( state = initialState, action) {

  switch ( action.type) {
    case NAV_ACTIVATE : {
      state = Object.assign({}, state, {active: action.active});
      break;
    }
  }
  return state;
}
