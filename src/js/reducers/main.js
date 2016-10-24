import { combineReducers } from "redux";

import user from "./userReducer";
import nav from "./navReducer";
import ds from "./dsReducer";

export default combineReducers( {
  user,
  nav,
  ds
} );
