import React from 'react';
import * as product from 'api/product/product.js';

export default class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    product.getAll();
  }


  render() {
    return (
      <h2>This is where the products should be</h2>
    );
  }
}
