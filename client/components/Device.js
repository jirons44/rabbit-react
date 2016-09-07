/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* global localStorage */

import React from 'react';
import axios from 'axios';

export default class Device extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, devices: [] };
    this.refresh = this.refresh.bind(this);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/devices', { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.setState({ devices: res.data });
    });
  }

  create(e) {
    e.preventDefault();
    const product = this.refs.product.value;
    const category = this.refs.category.value;
    const serialNumber = this.refs.serialNumber.value;
    axios.post('http://localhost:9001/api/devices', { product, category, serialNumber }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  render() {
    return (
      <div>

        <h1>Devices</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="type">Product</label>
                <input ref="product" type="text" className="form-control" id="product" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input ref="category" type="text" className="form-control" id="category" />
              </div>

              <div className="form-group">
                <label htmlFor="serialNumber">Serial Number</label>
                <input ref="serialNumber" type="text" className="form-control" id="serialNumber" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Serial Number</th>
                </tr>
              </thead>
              <tbody>
                {this.state.devices.map(e =>
                  <tr key={e.id}>
                    <td>{e.product}</td>
                    <td>{e.category}</td>
                    <td>{e.serialNumber}</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>

      </div>
    );
  }
}
