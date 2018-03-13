import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function LoginTitle() {
  return (
    <section id="login-title">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="title">
              <h2>Ваша учетная запись создана</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginTitle;
