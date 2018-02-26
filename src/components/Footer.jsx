import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Logo from './Toolbar/components/Logo';
import Navigation from './Toolbar/components/Navigation/Navigation';
import Phone from './Toolbar/components/Phone';

import info from '../utils/info';

function Footer() {
  return (
    <section id="footer">
      <div className="wave" />
      <Container>
        <Row className="no-gutters">
          <Col xs="12" lg="7" className="order-lg-2">
            <Navigation />
          </Col>
          <Col xs="12" lg="3" className="order-lg-1">
            <Logo
              logo={info.logo}
            />
          </Col>
          <Col xs="12" lg="2" className="order-lg-3">
            <Phone
              phone={info.phone}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Footer;
