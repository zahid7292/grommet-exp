import Main from "./components/Main";
import Dashboard from "./components/Dashboard";

module.exports = {
  path: '/',
  Component: Main,
  indexRoute: { Component: Dashboard},
  childRoutes: [

  ]
};
