import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import InputMask from 'react-input-mask';

import {
  FormHeader,
  FormButtonSubmit,
  FormInvalidFeedback,
} from './CustomElements';

class FormReg extends Component {
  constructor(props) {
    super(props);

    const { userData } = this.props;
    const { fullname, phone, email, address } = userData;

    this.state = {
      fullname: fullname || '',
      phone: phone || '',
      email: email || '',
      address: address || '',
      password: '',
      passConfirm: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { userData } = this.props;

    if (
      Object.keys(userData).length === 0 &&
      Object.keys(nextProps.userData).length !== 0
    ) {
      this.setState({
        ...this.state,
        ...nextProps.userData,
      });
    }
  }

  handleChange(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value,
    });
  }

  handleSubmit() {
    const { request } = this.props;

    request({ ...this.state });
  }

  render() {
    const {
      loading,
      title,
      buttonText,
      pwdRequired,
      className,
    } = this.props;

    return (
      <AvForm className={`form reg-form ${className}`} onValidSubmit={this.handleSubmit} >
        <div className="reg-form-container">
          <FormHeader text={title} />
          <AvGroup>
            <Label className="form-group-label" for="fullname">
              Введите ваше ФИО <span>*</span> :
            </Label>
            <div className="form-input-wrap">
              <AvInput
                type="text"
                name="fullname"
                id="fullname"
                ref={(input) => { this.fullname = input; }}
                placeholder="ФИО"
                value={this.state.fullname}
                onChange={this.handleChange}
                required
              />
              <i className="reg-form-icon fa fa-user-circle-o" />
            </div>
          </AvGroup>
          <Row>
            <Col xs="12" md="6">
              <AvGroup>
                <Label className="form-group-label" for="phone">
                  Введите ваш номер телефона <span>*</span> :
                </Label>
                <div className="form-input-wrap">
                  <AvInput
                    type="tel"
                    name="phone"
                    className="phone"
                    validate={{ async: () => {
                      const str = this.state.phone;

                      if (str) {
                        const result = str.match(/\d/g).join('').length;
                        return result === 12;
                      }

                      return false;
                    },
                    }}
                    disabled
                  />
                  <InputMask
                    type="tel"
                    id="phone"
                    className="form-control phone-mask"
                    mask="+38 (099) 999-99-99"
                    value={this.state.phone}
                    ref={(input) => { this.phone = input; }}
                    onChange={this.handleChange}
                    alwaysShowMask="true"
                  />
                  <i className="reg-form-icon fa fa-phone" />
                </div>
              </AvGroup>
            </Col>
            <Col xs="12" md="6">
              <AvGroup>
                <Label className="form-group-label" for="email">
                  Введите вашу почту <span>*</span> :
                </Label>
                <div className="form-input-wrap">
                  <AvInput
                    type="email"
                    name="email"
                    id="email"
                    ref={(input) => { this.email = input; }}
                    placeholder="Ваша почта"
                    value={this.state.email}
                    onChange={this.handleChange}
                    validate={{ email: true }}
                    required
                  />
                  <i className="reg-form-icon fa fa-envelope icon-phone" />
                </div>
                <FormInvalidFeedback
                  active={loading.error === 'email'}
                  text="Данный E-mail уже зарегистрирован!"
                />
              </AvGroup>
            </Col>
          </Row>
          <AvGroup>
            <Label className="form-group-label" for="address">
              Ваш адрес <span>*</span> :
            </Label>
            <div className="form-input-wrap">
              <AvInput
                type="address"
                name="address"
                id="address"
                ref={(input) => { this.address = input; }}
                placeholder="Улица, дом, подъезд, квартира"
                value={this.state.address}
                onChange={this.handleChange}
                required
              />
              <i className="reg-form-icon fa fa-home" />
            </div>
          </AvGroup>
          <Row>
            <Col xs="12" md="6">
              <AvGroup>
                <Label className="form-group-label" for="password">
                  Введите пароль <span>*</span> :
                </Label>
                <div className="form-input-wrap">
                  <AvInput
                    type="password"
                    name="password"
                    id="password"
                    ref={(input) => { this.password = input; }}
                    placeholder="Пароль"
                    value={this.state.password}
                    onChange={this.handleChange}
                    maxLength="10"
                    minLength="6"
                    required={pwdRequired}
                  />
                  <i className="reg-form-icon fa fa-lock" />
                </div>
              </AvGroup>
            </Col>
            <Col xs="12" md="6" >
              <AvGroup>
                <Label className="form-group-label" for="passConfirm">
                  Повторите ваш пароль <span>*</span> :
                </Label>
                <div className="form-input-wrap">
                  <AvInput
                    type="password"
                    name="passConfirm"
                    id="passConfirm"
                    ref={(input) => { this.passConfirm = input; }}
                    placeholder="Повторите Ваш пароль"
                    value={this.state.passConfirm}
                    onChange={this.handleChange}
                    maxLength="10"
                    minLength="6"
                    required={pwdRequired}
                  />
                  <i className="reg-form-icon fa fa-lock" />
                </div>
                <FormInvalidFeedback
                  active={loading.error === 'password'}
                  text="Не правильный пароль!"
                />
              </AvGroup>
            </Col>
          </Row>
          <FormGroup>
            <FormButtonSubmit checking={loading.pending} text={buttonText} />
          </FormGroup>
        </div>
      </AvForm>
    );
  }
}

FormReg.defaultProps = {
  userData: {},
  className: '',
  pwdRequired: true,
};

FormReg.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(PropTypes.string),
  request: PropTypes.func.isRequired,
  loading: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ])).isRequired,
  className: PropTypes.string,
  pwdRequired: PropTypes.bool,
};

export default FormReg;
