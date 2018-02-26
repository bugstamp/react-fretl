import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import Product from '../Product';

function ItemTitle({ product, buy }) {
  return (
    <section id="item-title">
      <Container>
        <Row className="no-gutters">
          <Col xs="12" sm="5" >
            <div className="image">
              <img src={product.img.large} alt={product.name} />
            </div>
          </Col>
          <Col xs="12" sm="7" >
            <Product
              product={product}
              buy={(id, order) => buy(id, order)}
            />
            <div className="info">
              <p className="item-description">{product.description}</p>
              <p className="remark">{product.remark}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

ItemTitle.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    productId: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    value: PropTypes.number,
    unit: PropTypes.string,
    img: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.string,
    calories: PropTypes.string,
    remark: PropTypes.string,
    newPrice: PropTypes.number,
  }).isRequired,
  buy: PropTypes.func.isRequired,
};

export default ItemTitle;
