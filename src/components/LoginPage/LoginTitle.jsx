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
      <div className="container">
        <div className="row">
          <div className="col-12" />
        </div>
      </div>
    </section>
  );
}

export default LoginTitle;
