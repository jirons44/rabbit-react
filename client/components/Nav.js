/* eslint-disable max-len, jsx-a11y/href-no-hash */
/* global localStorage, window */

import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.credentials = this.credentials.bind(this);
    this.logout = this.logout.bind(this);
    this.listen = this.listen.bind(this);
    this.state = { active: false, user: { } };
  }

  componentDidMount() {
    this.credentials();
    this.listen();
  }

  listen() {
    window.addEventListener('login', () => {
      this.credentials();
    });
  }

  credentials() {
    const authorization = localStorage.getItem('token');
    axios.get('http://localhost:9001/api/users/credentials', { headers: { authorization } })
    .then(res => {
      this.setState({ user: res.data, active: true });
    }).catch(() => {
      this.setState({ active: false });
    });
  }

  logout() {
    localStorage.clear();
    browserHistory.push('/');
    this.setState({ active: false });
  }

  render() {
    const links = [];
    if (this.state.active) {
      links.push(<li key={0}><Link to="/profile"><i className="fa fa-key fa-heartbeat" /> Profile</Link></li>);
      links.push(<li key={1}><Link to="/exercises"><i className="fa fa-key fa-bullhorn" /> Exercises</Link></li>);
      links.push(<li key={2}><a href="#" onClick={this.logout}><i className="fa fa-key fa-unlock" /> {this.state.user.username}</a></li>);
    } else {
      links.push(<li key={3}><Link to="/register"><i className="fa fa-user fa-fw" /> Register</Link></li>);
      links.push(<li key={4}><Link to="/login"><i className="fa fa-key fa-lock" /> Login</Link></li>);
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">Fitness</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav" />
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/"><i className="fa fa-home fa-fw" /> Home</Link></li>
              <li><Link to="/about"><i className="fa fa-hashtag fa-fw" /> About</Link></li>
              <li><Link to="/faq"><i className="fa fa-question-circle-o fa-fw" /> Faq</Link></li>
              { links }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
