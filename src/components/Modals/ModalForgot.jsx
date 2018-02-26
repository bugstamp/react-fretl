import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import FormForgot from '../Forms/FormForgot';
import FormForgotSuccess from '../Forms/FormForgotSuccess';

class ModalForgot extends Component {
  render() {
    const { isOpen, toggle, checking, checkUserLogin } = this.props;

    return (
      isOpen ?
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          className="auth-modal"
        >
          {
            !checking.success ?
              <FormForgot
                toggleModalForgot={toggle}
                checking={checking}
                checkUserLogin={checkUserLogin}
              />
              :
              <FormForgotSuccess
                toggleModalForgot={toggle}
                email={checking.email}
              />
          }
        </Modal>
        :
        null
    );
  }
}

ModalForgot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  checking: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default ModalForgot;
