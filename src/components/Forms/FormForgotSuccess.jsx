import React from 'react';
import PropTypes from 'prop-types';
import { AvForm } from 'availity-reactstrap-validation';
import { FormGroup } from 'reactstrap';

import { FormHeader } from './CustomElements';

function FormForgotSuccess({ toggleModalForgot, email }) {
  return (
    <AvForm className="form modal-form forgot-success-form">
      <FormHeader text="Проверьте Вашу почту" />
      <div className="form-message-wrap">
        <div className="form-message">
          <p className="main">
            На Вашу почту
            <span> {email} </span>
            <br />были отправлены инструкции по созданию нового пароля
          </p>
          <div className="subtitle">
            <h2>Не пришло письмо?</h2>
            <p>
              Проверьте корзину и папку спам на наличие письма от
              <span> fretl.od@gmail.com</span>
            </p>
          </div>
          <FormGroup>
            <a
              href="/"
              className="link"
              onClick={toggleModalForgot}
            >
            Вернуться назад
            </a>
          </FormGroup>
        </div>
      </div>
    </AvForm>
  );
}

FormForgotSuccess.defaultProps = {
  email: '',
};

FormForgotSuccess.propTypes = {
  toggleModalForgot: PropTypes.func.isRequired,
  email: PropTypes.string,
};

export default FormForgotSuccess;
