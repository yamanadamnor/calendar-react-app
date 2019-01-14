import React from 'react';
import * as product from 'api/product/product.js';

export default class ProductsPage extends React.Component {
  renderProducts() {
    return (
      <p>{product.getAll()}</p>
    );
  }

  render() {
    return (
      <div className="content">
        <h2>This is where the products should be</h2>
        <p>
          test hello
        </p>
      </div>
    );
  }
}
