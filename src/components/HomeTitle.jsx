import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import HomeTitleCarousel from './HomeTitleCarousel';

import info from '../utils/info';

function HomeTitle() {
  const { homeTitle } = info;

  return (
    <section id="home-title">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="title">
              <h2>{homeTitle.title}</h2>
              <p>{homeTitle.subtitle}</p>
              <div className="choose">
                выберите категорию
                <i className="icon" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <HomeTitleCarousel />
    </section>
  );
}

export default HomeTitle;
