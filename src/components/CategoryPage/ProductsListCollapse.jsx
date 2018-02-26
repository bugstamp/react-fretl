import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Collapse } from 'reactstrap';

import ProductsList from '../ProductsList';

function ProductsListCollapse({ isOpen, products }) {
  return (
    <Collapse isOpen={!isOpen}>
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <ProductsList products={products} />
          </Col>
        </Row>
      </Container>
    </Collapse>
  );
}

ProductsListCollapse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsListCollapse;
