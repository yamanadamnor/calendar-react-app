import React from 'react';
import RegisterPage from 'components/auth/register/RegisterPage';
import ProductsPage from 'components/products/ProductsPage';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul className="header">
            <li><NavLink to="/">Products</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={ProductsPage}/>
            <Route path="/register" component={RegisterPage}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
