export default function userReducer ( state = {
  user : {
    name : "administrator"
  }
}, action) {

  switch (action.type) {
    case "AUTH_USER": {
      console.log("Inside User Reducer");
      console.log(action.payload);
      break;
    }
    default:
  }
  return state;
}
