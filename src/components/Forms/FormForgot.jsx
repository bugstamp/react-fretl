import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Label, FormGroup } from 'reactstrap';

import {
  FormHeader,
  FormButtonSubmit,
  FormInvalidFeedback,
} from './CustomElements';

import IconEmail from '../../assets/images/icon/icon-email.svg';

class FormForgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forgottenEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value,
    });
  }

  handleSubmit() {
    const { forgottenEmail } = this.state;
    const { checkUserLogin } = this.props;

    checkUserLogin(forgottenEmail);
  }

  render() {
    const { forgottenEmail } = this.state;
    const { toggleModalForgot, checking } = this.props;

    return (
      <AvForm onValidSubmit={this.handleSubmit} className="form modal-form forgot-form">
        <FormHeader text="Забыли пароль?" />
        <AvGroup>
          <Label for="forgottenEmail" className="form-group-label">
            Введите вашу почту, что бы мы могли вам помочь <span>*</span> :
          </Label>
          <div className="form-input-wrap">
            <AvInput
              type="email"
              name="forgottenEmail"
              id="forgottenEmail"
              ref={(input) => { this.forgottenEmail = input; }}
              placeholder="Ваша почта"
              value={forgottenEmail}
              onChange={this.handleChange}
              validate={{ email: true }}
              required
            />
            <IconEmail className="icon" />
          </div>
          <FormInvalidFeedback
            active={!checking.success && checking.error}
            text="Данный E-mail не зарегистрирован!"
          />
        </AvGroup>
        <FormGroup>
          <FormButtonSubmit checking={checking.pending} text="Подтвердить" />
        </FormGroup>
        <FormGroup>
          <a href="/" className="link" onClick={toggleModalForgot}>Вернуться назад</a>
        </FormGroup>
      </AvForm>
    );
  }
}

FormForgot.propTypes = {
  toggleModalForgot: PropTypes.func.isRequired,
  checking: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default FormForgot;
