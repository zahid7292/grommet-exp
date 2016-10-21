import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory} from "react-router";

//import routes from "./Routes";
import store from "./store";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Logon from "./components/Logon";

let element = document.getElementById('content');
ReactDOM.render((
  <div>
    <Provider store={store} >
      <Router history={hashHistory} >
        <Route path="/" component={Main}>
          <IndexRoute component={Dashboard} />
          <Route path="logon" component={Logon} />
        </Route>
      </Router>
    </Provider>
  </div>
), element);

document.body.classList.remove('loading');



/*
import App from 'grommet/components/App';
import Anchor from 'grommet/components/Anchor';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Search from 'grommet/components/Search';
import TodoAppDashboard from './components/TodoAppDashboard';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" large={true}
          pad={{horizontal: 'medium'}}>
          <Title>Grommet Sample Application</Title>
          <Menu direction="row" align="center" responsive={false}>
            <Anchor href="#">
              Login
            </Anchor>
          </Menu>
        </Header>


        <TodoAppDashboard />
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Build your ideas with <Anchor href="http://grommet.io" target="_blank">Grommet</Anchor>!
          </p>
        </Footer>
      </App>
    );
  }
};*/
