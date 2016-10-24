import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Logon from "./components/Logon";
import DSConfig from './components/DSConfig';

export default {
  path: '/',
  component: Main,
  indexRoute: {component: Dashboard},
  childRoutes: [
    { path: 'logon', component: Logon},
    { path: 'ds_config', component: DSConfig}
  ]
};
