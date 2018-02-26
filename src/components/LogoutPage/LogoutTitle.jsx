import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function LogoutTitle() {
  return (
    <section id="logout-title">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="title">
              <h2>Выход</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LogoutTitle;
