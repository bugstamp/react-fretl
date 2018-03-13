import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import Logo from './Logo';
import RightMenu from './RightMenu';
import NavButton from './NavButton';

import Navigation from './Navigation/Navigation';
import DropDownNav from './Navigation/DropDownNav';
import Cart from './Cart/Cart';

import info from '../../../utils/info';

class FixedHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      collapse: false,
    };

    this.scrollToShow = this.scrollToShow.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    window.addEventListener('scroll', this.scrollToShow);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollToShow);
  }

  scrollToShow() {
    const scrollTop = window.pageYOffset;
    const limit = 90;

    if (scrollTop > limit && !this.state.show) {
      this.setState({ show: true });
    } else
    if (scrollTop < limit && this.state.show) {
      this.setState({
        show: false,
        collapse: false,
      });
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { show, collapse } = this.state;
    const {
      cart,
      getCart,
      increment,
      decrement,
      remove,
      checkout,
    } = this.props;

    return (
      <section
        id="fixed-header"
        className={`${show ? 'is-show' : ''}`}
        onScroll={this.scrollToShow}
      >
        <Container>
          <Row className="no-gutters">
            <Col xs="6" xl="1">
              <Logo
                logo={info.logo}
              />
            </Col>
            <Col xl="8" className="d-none d-xl-block">
              <Navigation />
            </Col>
            <Col xs="6" xl="3">
              <RightMenu>
                <NavButton
                  toggle={this.toggle}
                  isOpen={collapse}
                />
                <Cart
                  getCart={getCart}
                  cart={cart}
                  increment={increment}
                  decrement={decrement}
                  remove={remove}
                  checkout={checkout}
                />
              </RightMenu>
            </Col>
          </Row>
        </Container>
        <DropDownNav isOpen={collapse} />
      </section>
    );
  }
}

FixedHeader.propTypes = {
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.shape({
    loading: PropTypes.objectOf(PropTypes.bool),
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

export default FixedHeader;
