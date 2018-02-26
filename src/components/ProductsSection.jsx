import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import ProductsSectionDescription from './ProductsSectionDescription';
import ProductsList from './ProductsList';
import ProductsSectionButton from './ProductsSectionButton';

class ProductsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleOpenList = this.handleOpenList.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  handleOpenList() {
    if (!this.state.open) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
      this.scrollToTop();
    }
  }

  scrollToTop() {
    const node = this.section.getBoundingClientRect();
    const top = node.top + window.scrollY;

    window.scrollTo(0, top);
  }

  render() {
    const { sectionId, title, description, products, withButton } = this.props;
    const { open } = this.state;

    const showButton = products.length > 4;
    const activeProducts = products.filter((product, index) => {
      if (!open) {
        return index < 4;
      }

      return product;
    });

    return (
      <section id={sectionId} ref={(node) => { this.section = node; }}>
        <Container>
          <Row>
            <Col xs="12">
              <ProductsSectionDescription
                title={title}
                description={description}
              />
            </Col>
            <Col xs="12">
              <ProductsList products={activeProducts} />
              {
                withButton ?
                  <ProductsSectionButton
                    isOpen={open}
                    show={showButton}
                    onClick={this.handleOpenList}
                  />
                  :
                  null
              }
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

ProductsSection.defaultProps = {
  products: [],
  description: '',
  withButton: true,
};

ProductsSection.propTypes = {
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string,
  withButton: PropTypes.bool,
};

export default ProductsSection;
