/**
 * Created by razamd on 10/22/2016.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';

import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Status from 'grommet/components/icons/Status';


import { addDatasource, getDatasources, saveDatasource, deleteDatasource, testDSConnetion } from '../actions/sitescopeActions';
import { navActivate } from '../actions/NavActions';

class DBConfig extends Component {

  constructor (props) {
    super(props);
    this.state = {
      ds: {},
      showForm: false,
      rowSelected: -1
    };
    this._openNav = this._openNav.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._getDatasources = this._getDatasources.bind(this);
    this._rowSelect = this._rowSelect.bind(this);
    this._showForm = this._showForm.bind(this);
    this._saveDatasource = this._saveDatasource.bind(this);
    this._deleteDatasource = this._deleteDatasource.bind(this);
    this._testConnection = this._testConnection.bind(this);
  }

  /*componentWillReceiveProps(newProps) {
    this.setState({ds: newProps.ds});
  }*/

  componentWillMount () {
    this._getDatasources(this.props.user.token);
  }

  _onSubmit ( event ) {
    event.preventDefault();
    console.log(this.state.ds);
    this.props.dispatch(addDatasource(this.state.ds, this.props.ds.common));
    this.setState({showForm: false});
  }

  _onChange ( event ) {
    var ds = this.state.ds;
    ds[event.target.getAttribute('name')] = event.target.value;
    this.setState({ds: ds});
  }

  _openNav () {
    this.props.dispatch(navActivate(true));
  }

  _getDatasources (token) {
    console.log(token);
    this.props.dispatch(getDatasources(token));
  }

  _saveDatasource () {
    const row = this.state.rowSelected;
    const { token } = this.props.user;
    if ( row != -1) {
      saveDatasource(this.props.ds.ds[row], token);
    }else{
      alert('Select a Datasource first');
    }
  }

  _deleteDatasource () {
    const row = this.state.rowSelected;
    const { token } = this.props.user;
    if ( row != -1) {
      const ds = this.props.ds.ds[row];
      if (! ds.local ) {
        console.log('Call Delete Data Source Action');
        deleteDatasource( ds.id, token );
      }else{
        alert('This Data Source is not saved in database');
      }
    }else{
      alert('Select a Datasource first');
    }
  }

  _testConnection () {
    const row = this.state.rowSelected;
    const { token } = this.props.user;
    if ( row != -1) {
      testDSConnetion(this.props.ds.ds[row], token);
    }else{
      alert('Select a Datasource first');
    }
  }

  _rowSelect (index) {
    this.setState({rowSelected: index});
  }

  _showForm () {
    this.setState({showForm: true});
  }

  render () {
    //console.log(this.props.ds);
    let { active : navActive} = this.props.nav;
    let title = null;
    if (! navActive ) {
      title = (
        <Title onClick={this._openNav}>
          Sample App
        </Title>
      );
    }

    const datasources = this.props.ds.ds;

    let tmp = datasources.map( (ds) => {
      return (
        <TableRow key={ds.id}>
          <td>{ds.hostName}</td>
          <td><Status value={ds.connStatus ? 'ok' : 'unknown'} /></td>
        </TableRow>
      );

    });

    const form = (
      <Form onSubmit={this._onSubmit} pad={{horizontal: 'large'}}>
        <Header>
          <h1>Add Data Source</h1>
        </Header>
        <FormFields>
          <fieldset>
            <FormField label="Hostname" htmlFor="hostname">
              <input type="text" id="hostname" name="hostName"  onChange={this._onChange} />
            </FormField>
            <FormField label="Port" htmlFor="port">
              <input type="text" id="port" name="port" onChange={this._onChange} />
            </FormField>
            <FormField label="UserName" htmlFor="username">
              <input type="text" id="username" name="userName" onChange={this._onChange} />
            </FormField>
            <FormField label="Password" htmlFor="password">
              <input type="password" id="password" name="password" onChange={this._onChange} />
            </FormField>
          </fieldset>

          <fieldset>
            <FormField label="Init String" htmlFor="initString">
              <input type="text" id="initString" name="initString" onChange={this._onChange} />
            </FormField>
            <FormField label="Integration Name" htmlFor="intName">
              <input type="text" id="intName" name="integrationName"  onChange={this._onChange} />
            </FormField>
          </fieldset>

        </FormFields>

        <Footer pad={{"vertical": "medium"}} size="large">
          <Button type="submit" fill={true} label="Add Data Source" primary={true} onClick={this._onSubmit} />
        </Footer>

      </Form>
    );



    const formValue = this.state.showForm ? form : null;

    return (
      <div>
        {/*Header*/}
        <Header>
          <div>
            {title}
          </div>
          <Search inline={true} fill={true} size="medium" placeHolder="Search" />
        </Header>

        {/*Status Bar*/}
        <Box pad="medium">
          <Box margin={{vertical: "medium"}} >
            <Table selectable={true} onSelect={this._rowSelect}>
              <thead>
                <tr>
                  <th>Hostname</th>
                  <th>Connection status</th>
                </tr>
              </thead>
              <tbody>
                {tmp}
              </tbody>
            </Table>
          </Box>

          <Box direction="row">
            <Box >
              <Button label="Test Connection" onClick={this._testConnection} />
            </Box>
            <Box margin={{horizontal: 'medium'}}>
              <Button label="Create New" onClick={this._showForm} />
            </Box>
            <Box margin={{horizontal: 'medium'}}>
              <Button label="Save Data Source" onClick={this._saveDatasource} />
            </Box>
            <Box margin={{horizontal: 'medium'}}>
              <Button label="Delete Data Source" onClick={this._deleteDatasource} />
            </Box>
          </Box>
        </Box>

        {formValue}

      </div>
    );
  }
}

let select = (store) => {
  return { nav: store.nav, ds: store.ds, user: store.user};
};

export default connect(select)(DBConfig);
/*
var tmp = {
  "hostName": "iwfvm02864.hpeswlab.net",
  "port": 8080,
  "userName": "admin",
  "password": "admin",
  "initString": "Xjpj9r3jm9cc",
  "integrationName": "SHRSISIntegration",

  "action":1,
  "collectionEnabled": false,
  "pollerName": "local",
  "sslConn": false,
  "encoding": "UTF-8",
  "reportingInterval": 60,
  "requestTimeout": 120,
  "connectionTimeout": 120,
  "retriesCount": 3,
  "authenticationRequested": true,
  "authenticationFlag": false,
  "authFlag": false,
  "selected":true,
  "tagName":"SHRSISIntegrationTag",
  "authenticationUsername": "shrtest",
  "authenticationPassword": "shrtest"

};

*/
/*

{
  "href": "https://15.114.242.14:21412/AdminService/v1/SiteScopes",
  "sitescopeDatabase": [
  {
    "id": "129277",
    "genericId": null,
    "hostName": "iwfvm02864.hpeswlab.net",
    "port": 8080,
    "userName": "admin",
    "password": "admin",
    "selected": false,
    "connection": false,
    "connectionStatus": 0,
    "conImage": "/images/gui/status/failed.gif",
    "lastColDate": null,
    "collection": "NEVER_STARTED",
    "collectionStatus": 1,
    "colImage": "/images/gui/status/neverstarted.gif",
    "windowAuth": false,
    "windowAuthorization": 0,
    "collectionEnabled": false,
    "colEnabled": 0,
    "action": 0,
    "schedule": {
      "scheduleName": null,
      "selectedDays": 0,
      "selectedHour": 0,
      "selectedMinutes": 0,
      "maxDays": 7,
      "minDays": 0,
      "maxHour": 24,
      "minHours": 1,
      "minHoursZero": 0,
      "maxMinutes": 60,
      "minMinutes": 0,
      "minMinutesForVC": 5,
      "maxMinutesForVC": 60,
      "frequency": 0,
      "scheduleId": null,
      "sunday": 0,
      "bolSunday": false,
      "monday": 0,
      "bolMonday": false,
      "tuesday": 0,
      "bolTuesday": false,
      "wednesday": 0,
      "bolWednesday": false,
      "thursday": 0,
      "bolThursday": false,
      "friday": 0,
      "bolFriday": false,
      "saturday": 0,
      "bolSaturday": false
    },
    "dbType": "ORACLE",
    "databaseInstance": null,
    "databaseName": null,
    "datasourceType": null,
    "disableBacSchedule": false,
    "dataSourceTypeLabel": " ",
    "fileName": null,
    "serverName": null,
    "selectedHrs": 0,
    "newProfileDB": null,
    "profileDeleted": null,
    "selectedUnSupported": 0,
    "timeZone": null,
    "url": null,
    "driver": null,
    "domainIds": [],
    "racSetup": 0,
    "rac": false,
    "node": null,
    "topologyEnabled": false,
    "topologyInterval": 0,
    "pollerName": "local",
    "oraFileName": "",
    "communicationMode": null,
    "sslConn": false,
    "compression": null,
    "initString": "Xjpj9r3jm9cc",
    "type": null,
    "linkType": 0,
    "integrationName": "SHRSISIntegration",
    "encoding": "UTF-8",
    "reportingInterval": 60,
    "requestTimeout": 120,
    "connectionTimeout": 120,
    "retriesCount": 3,
    "authenticationRequested": true,
    "authenticationFlag": false,
    "authFlag": false,
    "authenticationUsername": "shrtest",
    "authenticationPassword": "shrtest",
    "proxyAddress": "",
    "proxyUsername": "",
    "proxyPassword": "",
    "includeTag": true,
    "tagName": null,
    "httpBindPort": 21418,
    "httpsBindPort": 21419,
    "dmActive": false,
    "source_name": null,
    "source_description": null,
    "ssl": false
  }
]
}
*/
