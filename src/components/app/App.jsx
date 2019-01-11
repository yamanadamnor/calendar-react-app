import React from 'react';
import * as account from 'api/account/account';
import WelcomePage from 'components/app/WelcomePage';
import RegisterPage from 'components/auth/register/RegisterPage';
import LoginPage from 'components/auth/login/LoginPage';
import ProductsPage from 'components/products/ProductsPage';
import { Route, BrowserRouter } from 'react-router-dom';

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
        <div className="content">
          <Route exact path="/" component={this.state.loggedIn ? ProductsPage : WelcomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </BrowserRouter>
    );
  }
}
