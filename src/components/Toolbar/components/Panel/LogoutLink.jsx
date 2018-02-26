import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconSignIn from './IconSignIn';

class LogoutLink extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    const { requestUserLogout } = this.props;

    requestUserLogout();
  }

  render() {
    return (
      <a href="/" onClick={this.logout} className="link link-sign-in">
      Выйти
        <IconSignIn />
      </a>
    );
  }
}

LogoutLink.propTypes = {
  requestUserLogout: PropTypes.func.isRequired,
};

export default LogoutLink;
