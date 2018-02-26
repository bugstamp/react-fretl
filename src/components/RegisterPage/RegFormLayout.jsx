import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import FormReg from '../Forms/FormReg';
import RegFormFooter from './RegFormFooter';

function RegFormLayout({ checkUserLogin, requestUserAuth, requestUserReg, user }) {
  return (
    <section id="register-form-section">
      <div className="top" />
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <FormReg
              title="Регистрация"
              loading={user.recording}
              request={requestUserReg}
              buttonText="Создать аккаунт"
              pwdRequired
            />
            <RegFormFooter
              user={user}
              requestUserAuth={requestUserAuth}
              checkUserLogin={checkUserLogin}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

RegFormLayout.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  requestUserReg: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default RegFormLayout;
