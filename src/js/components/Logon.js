import React, { Component } from "react";
import { connect } from "react-redux";

//components
import LoginForm from "grommet/components/LoginForm";

import { authUser } from "../actions/userActions";

class Logon extends Component {

  _onLogon (fields) {
    console.log("Submit Button Clicked");
    console.log(fields.username);
    const { username, password } = fields;
    this.props.dispatch(authUser(username, password));
  }

  render () {
    const { user } = this.props;
    return (
      <div>

        <LoginForm
                title="Admin UI Login"
                align="start"
                onSubmit={this._onLogon.bind(this)}
                rememberMe={true}
                defaultValues={{"username": user.name}}
                usernameType="text" />
      </div>
    );
  }
}

let select = (store) => {
  return {
    user: store.user.user
  };
};

export default connect(select)(Logon);
