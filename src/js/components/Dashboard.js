import React, { Component } from "react";
import { connect } from 'react-redux';
//import { Link } from "react-router";

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import LoginForm from 'grommet/components/LoginForm';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

import { navActivate } from '../actions/NavActions';
import { authUser } from "../actions/userActions";

class Dashboard extends Component {

  constructor () {
    super();
    this._openNav = this._openNav.bind(this);
    this._onLogon = this._onLogon.bind(this);
  }

  _openNav () {
    this.props.dispatch(navActivate(true));
  }

  _onLogon (fields) {
    console.log("Submit Button Clicked");
    const { username, password } = fields;
    this.props.dispatch(authUser(username, password));
  }

  render () {

    let { token, username, authProgress } = this.props.user;
    let content = null;
    const loading = authProgress ? (<div><Spinning /> <h3>Please wait...</h3></div> ) : null;

    if ( token == null ) {
      content = (
        <Box margin={{horizontal: 'large'}} direction="row">
          <Box>
            <LoginForm
              title="Admin Login"
              align="start"
              onSubmit={this._onLogon}
              rememberMe={false}
              defaultValues={{"username": username}}
              usernameType="text" />
          </Box>
          <Box align='baseline' margin={{vertical: 'large'}} pad={{vertical: 'large'}} >
            {loading}
          </Box>


        </Box>
      );
    }else{
      content = (<h1>Welcome to Dashboard.</h1>);
    }

    let { active : navActive} = this.props.nav;
    let title = null;
    if (! navActive ) {
      title = (
        <Title onClick={this._openNav}>
          Sample App
        </Title>
      );
    }

    return (
      <div>
        <Header>
          <div>
            {title}
          </div>

          <Search inline={true} fill={true} size="medium" placeHolder="Search" />
        </Header>
        {content}
      </div>
    );
  }
}

let select = (store) => {
  return { nav: store.nav, user: store.user };
};

export default connect(select)(Dashboard);
