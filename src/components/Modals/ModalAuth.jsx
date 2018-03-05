import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import FormAuth from '../Forms/FormAuth';

import ModalForgot from './ModalForgot';
import ModalCloseButton from './ModalCloseButton';

class ModalAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalForgot: false,
    };

    this.toggleModalForgot = this.toggleModalForgot.bind(this);
  }

  toggleModalForgot(e) {
    if (e) e.preventDefault();

    this.setState({
      modalForgot: !this.state.modalForgot,
    });
  }

  render() {
    const { isOpen, toggle, user, requestUserAuth, checkUserLogin } = this.props;
    const { modalForgot } = this.state;

    return (
      isOpen ?
        <Modal isOpen={isOpen} toggle={toggle} className="auth-modal">
          <ModalCloseButton onClick={toggle} />
          <FormAuth
            toggleModalAuth={toggle}
            toggleModalForgot={this.toggleModalForgot}
            logging={user.logging}
            requestUserAuth={requestUserAuth}
          />

          <ModalForgot
            isOpen={modalForgot}
            toggle={this.toggleModalForgot}
            checking={user.checkingLogin}
            checkUserLogin={checkUserLogin}
          />
        </Modal>
        :
        null
    );
  }
}

ModalAuth.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default ModalAuth;
