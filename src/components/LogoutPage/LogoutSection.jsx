import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function LogoutSection() {
  return (
    <section id="logout-section">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="layout">
              <h1>Выход</h1>
              <p>Вы вышли из Личного Кабинета.</p>
              <p>
              Ваша корзина покупок была сохранена.
              Она будет восстановленна при следующем входе в Ваш Личный Кабинет</p>
              <div className="button-go-home">
                <NavLink className="button no-effect" to="/">Продолжить</NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LogoutSection;
