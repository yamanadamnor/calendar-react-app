import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { Transition, config } from 'react-spring/renderprops';
import { Spin } from 'antd';

import * as account from '../../api/account/account';
import * as utils from '../../api/utils/utils';
import WelcomePage from '../app/WelcomePage';
import SetupPage from '../app/SetupPage';
import RegisterPage from '../auth/register/RegisterPage';
import LoginPage from '../auth/login/LoginPage';
import CalendarPage from '../calendar/CalendarPage';
import TaskPage from '../tasks/TaskPage';
import SettingsPage from '../settings/SettingsPage';
import history from '../history';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      newUser: false,
      done: false,
    }
  }

  async componentDidMount() {
    if (utils.getCookie('X-CSRF-Token')) {
      let check = await account.validateLoggedIn();
      this.setState({ loggedIn: check, done: true });
    } else {
      this.setState({ done: true });
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
    account.getAllSettings()
      .then(res => {
        if (res.length === 0) {
          this.setState({ newUser: true });
        }
        history.push('/');
      });
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
    });
    history.push('/');
  }

  handleSetup = () => {
    this.setState({
      newUser: false,
    });
    history.push('/');
  }

  render() {
    return (
      !this.state.done ?
        <Spin style={{ position: 'absolute', left: '50%', top: '50%'}} /> :
        <Router history={history}>
          <Route render={({location}) => (
              <Transition
                native
                config={config.slow}
                keys={location.pathname}
                items={location}
                from={{ position: 'absolute', opacity: 0 }}
                enter={{ position: 'absolute', opacity: 1 }}
                leave={{ position: 'absolute', opacity: 0 }}
              >
                {(loc, state) => style => (
                  <Switch location={state === 'update' ? location : loc}>
                    <Route exact path="/" render={() => 
                      this.state.newUser ? <SetupPage style={style} onFinish={this.handleSetup} /> : 
                      this.state.loggedIn ? <CalendarPage onLogout={this.handleLogout} style={style} /> : 
                      <WelcomePage style={style} />} />
                    <Route path="/register" render={() => <RegisterPage style={style} onLogin={this.handleLogin} />} />
                    <Route path="/login" render={() => <LoginPage style={style} onLogin={this.handleLogin} />} />

                    {/* Protected routes */}
                    <Route
                      path="/tasks" 
                      render={() => this.state.loggedIn ? <TaskPage style={style} /> :
                        <Redirect to='/login' />} />
                    <Route
                      path="/settings"
                      render={() => this.state.loggedIn ? <SettingsPage style={style} /> : 
                        <Redirect to='/login' />} />
                    {/* end protected routes */}
                  </Switch>
                )}
              </Transition>
          )} />
        </Router>
    );
  }
}