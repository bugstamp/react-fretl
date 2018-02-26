import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconSignIn from './IconSignIn';
import ModalAuth from '../../../Modals/ModalAuth';

class SignInLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalAuth: false,
    };

    this.toggleModalAuth = this.toggleModalAuth.bind(this);
  }

  toggleModalAuth(e) {
    if (e) e.preventDefault();

    this.setState({
      modalAuth: !this.state.modalAuth,
    });
  }

  render() {
    const { modalAuth } = this.state;
    const { user, requestUserAuth, checkUserLogin } = this.props;

    return (
      <a
        href="/"
        onClick={this.toggleModalAuth}
        className="link link-sign-in"
      >
        Войти
        <IconSignIn />

        <ModalAuth
          isOpen={modalAuth}
          toggle={this.toggleModalAuth}
          user={user}
          requestUserAuth={requestUserAuth}
          checkUserLogin={checkUserLogin}
        />
      </a>
    );
  }
}

SignInLink.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default SignInLink;
