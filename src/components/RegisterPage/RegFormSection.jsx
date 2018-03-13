import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import FormReg from '../Forms/FormReg';
import RegFormFooter from './RegFormFooter';

function RegFormSection({ checkUserLogin, requestUserAuth, requestUserReg, user }) {
  return (
    <section id="register-page-form">
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

RegFormSection.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  requestUserReg: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default RegFormSection;
