import React, { Component } from "react";
import { Link } from "react-router";

//components
import App from "grommet/components/App";
import Header from "grommet/components/Header";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import Footer from 'grommet/components/Footer';

export default class Main extends Component {
  render () {

    return (
      <App>

        <Header justify="between">
          <Title>
            <Link to="/" >Grommet Sample Application </Link>
          </Title>
          <Menu direction="row" align="center" responsive={false}>

            <Link to="logon" >Login</Link>
          </Menu>
        </Header>

        <div>
          {this.props.children}
        </div>

        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Build your ideas with <Anchor href="http://grommet.io" target="_blank">Grommet</Anchor>!
          </p>
        </Footer>
      </App>
    );
  }
}
