import React from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group-v2';

import * as account from 'api/account/account';
import WelcomePage from 'components/app/WelcomePage';
import RegisterPage from 'components/auth/register/RegisterPage';
import LoginPage from 'components/auth/login/LoginPage';
import ProductsPage from 'components/products/ProductsPage';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  async componentDidMount() {
    let check = await account.validateLoggedIn();
    this.setState({ loggedIn: check });
  }

  render() {
    return (
      <BrowserRouter>
        <RouteContainer loggedIn={this.state.loggedIn} />
      </BrowserRouter>
    );
  }
}

const RouteContainer = withRouter((props) => {
  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={'fade'}
        >
          <div className="route-wrapper">
            <Switch location={props.location}>
              <Route exact path="/" component={props.loggedIn ? ProductsPage : WelcomePage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
});
