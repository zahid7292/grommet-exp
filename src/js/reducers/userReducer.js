import { AUTH_PROGRESS, AUTH_SUCCESS, AUTH_FAIL } from "../actions/constants";

export default function userReducer ( state = {
  username : "administrator",
  token: null,
  authProgress: false
}, action) {

  switch (action.type) {
    case AUTH_PROGRESS: {
      state = Object.assign({}, state, {authProgress: true});
      break;
    }
    case AUTH_SUCCESS: {
      state = Object.assign({}, state, {token: action.token, authProgress: false});
      break;
    }
    case AUTH_FAIL: {
      state = Object.assign({}, state, {authProgress: false});
      break;
    }
    default:
  }
  return state;
}
