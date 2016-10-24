import React, { Component } from "react";
import { connect } from 'react-redux';

//components
import App from "grommet/components/App";
import NavSidebar from "./NavSidebar";
import Split from 'grommet/components/Split';


class Main extends Component {
  render () {
    const { active } = this.props;

    var pane1 = active ? <NavSidebar /> : null;
    var pane2 = this.props.children;

    return (
      <App centered={false}>
        <Split flex="right">
            {pane1}
            {pane2}
        </Split>

        {/*<Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Build your ideas with <Anchor href="http://grommet.io" target="_blank">Grommet</Anchor>!
          </p>
        </Footer>*/}
      </App>
    );
  }
}

let select = (store) => {
  return store.nav;
};

export default connect(select)(Main);
