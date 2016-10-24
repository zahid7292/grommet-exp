import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Sidebar from "grommet/components/Sidebar";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
// import Anchor from "grommet/components/Anchor";
import Close from "grommet/components/icons/base/Close";

import { navActivate } from '../actions/NavActions';

class NavSidebar extends Component {

  constructor () {
    super();

    this._onClose = this._onClose.bind(this);

  }


  _onClose () {
    console.log('Close Button clicked');
    this.props.dispatch(navActivate(false));
  }

  render () {
    const { nav: {items}} = this.props;
    var links = items.map( (page) => {
      return (
        <Link key={page.label} to={page.path}>
          {page.label}
        </Link>
      );
    });
    return (
      <Sidebar colorIndex="neutral-1" full={true} size="medium">
        <Header pad="medium" justify="between" >
          <Title>
            Sample App
          </Title>
          <Button icon={<Close />} onClick={this._onClose} />
        </Header>
        <Menu primary={true}>
          {links}
        </Menu>
      </Sidebar>
    );
  }
}

let select = (store) => {
  return { nav : store.nav };
};

export default connect(select)(NavSidebar);
