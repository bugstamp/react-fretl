import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function LoginSection() {
  return (
    <section id="login-section">
      <Container>
        <Row>
          <Col xs="12">
            <div className="layout">
              <h1>Ваша учетная запись создана!</h1>
              <p>Поздравляем! Ваш Личный Кабинет был успешно создан</p>
              <div className="button go-home">
                <NavLink to="/">Продолжить</NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginSection;
