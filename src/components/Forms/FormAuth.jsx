import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Label, FormGroup } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import {
  FormHeader,
  FormButtonSubmit,
  FormCheckBox,
  FormInvalidFeedback,
} from './CustomElements';

import IconEmail from '../../assets/images/icon/icon-email.svg';
import IconLock from '../../assets/images/icon/icon-lock.svg';

import axios from '../../axios';

class FormAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      remember: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleRemember = this.toggleRemember.bind(this);
    this.setRememberInputs = this.setRememberInputs.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/auth/remember');
      const { data } = res;

      this.setRememberInputs(data);

      return data;
    } catch (e) {
      return e;
    }
  }

  setRememberInputs({ email, password }) {
    this.email.value = email;
    this.password.value = password;

    this.setState({
      email,
      password,
    });
  }

  toggleRemember() {
    this.setState({ remember: !this.state.remember });
  }

  handleChange(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value,
    });
  }

  handleSubmit() {
    const { requestUserAuth } = this.props;
    const {
      email,
      password,
      remember,
    } = this.state;

    requestUserAuth({ email, password }, remember);
  }

  render() {
    const { email, password, remember } = this.state;
    const {
      toggleModalAuth,
      toggleModalForgot,
      logging,
    } = this.props;

    return (
      <AvForm
        className="form modal-form auth-form"
        onValidSubmit={this.handleSubmit}
      >
        <FormHeader text="Здравствуйте!" />
        <AvGroup>
          <Label for="email" className="form-group-label">
            Введите вашу почту <span>*</span> :
          </Label>
          <div className="form-input-wrap">
            <AvInput
              type="email"
              name="email"
              id="email"
              ref={(input) => { this.email = input; }}
              value={email}
              placeholder="Ваша почта"
              onChange={this.handleChange}
              validate={{ email: true }}
              autoComplete="email"
              required
            />
            <IconEmail className="icon" />
          </div>
          <FormInvalidFeedback
            active={!logging.success && logging.error === 'email'}
            text="Не правильный E-mail!"
          />
        </AvGroup>
        <AvGroup>
          <Label for="password" className="form-group-label">
            Введите пароль <span>*</span> :
          </Label>
          <div className="form-input-wrap">
            <AvInput
              type="password"
              name="password"
              id="password"
              ref={(input) => { this.password = input; }}
              value={password}
              placeholder="Ваш пароль"
              onChange={this.handleChange}
              validate={{ minLength: { value: 6 } }}
              maxLength="10"
              autoComplete="new-password"
              required
            />
            <IconLock className="icon" />
          </div>
          <FormInvalidFeedback
            active={!logging.success && logging.error === 'password'}
            text="Не правильный пароль!"
          />
        </AvGroup>
        <AvGroup className="check">
          <Label
            check
            for="checkbox"
            onClick={this.toggleRemember}
          >
            <FormCheckBox active={remember} />
            Запомнить меня
          </Label>
          <a
            href="/"
            className="link link-modal-pass"
            onClick={toggleModalForgot}
          >
            Забыли пароль?
          </a>
        </AvGroup>
        <FormGroup>
          <FormButtonSubmit
            checking={logging.pending}
            text="Ввойти"
          />
        </FormGroup>
        <div className="form-footer">
          <NavLink
            to="/register"
            onClick={toggleModalAuth}
            className="link"
          >
            Зарегистрироваться
          </NavLink>
        </div>
      </AvForm>
    );
  }
}

FormAuth.propTypes = {
  toggleModalAuth: PropTypes.func.isRequired,
  toggleModalForgot: PropTypes.func.isRequired,
  logging: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
};

export default FormAuth;
