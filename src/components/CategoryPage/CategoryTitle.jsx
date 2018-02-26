import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import Sort from './Sort';

function CategoryTitle({ topic, sort, setSort }) {
  return (
    <section id="category-title">
      <Container>
        <Row className="no-gutters">
          <Col xs="12" md="6" className="order-md-2">
            <div className="image">
              <img src={topic.image} alt={topic.title} />
            </div>
          </Col>
          <Col xs="12" md="6" className="order-md-1">
            <div className="topic">
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
            </div>
            <Sort sort={sort} setSort={setSort} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

CategoryTitle.propTypes = {
  topic: PropTypes.objectOf(PropTypes.string).isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default CategoryTitle;
