import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function NotFoundTitle() {
  return (
    <section className="title">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <NavLink to="/">
              <button>
                <i className="icon" />
                Вернуться к покупкам
              </button>
            </NavLink>
            <h2>Запрашиваемая страница не найдена!</h2>
            <p>
              К сожалению, запрашиваемая Вами страница не найдена.
              Вероятно, Вы указали несуществующий адрес, страница была удалена,
              перемещена или сейчас она временно недоступна!
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default NotFoundTitle;
