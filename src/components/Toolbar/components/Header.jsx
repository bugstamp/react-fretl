import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import Logo from './Logo';
import Phone from './Phone';
import RightMenu from './RightMenu';

import UserPanel from './Panel/UserPanel';
import Search from './Search/Search';
import Cart from './Cart/Cart';

import info from '../../../utils/info';

function Header(props) {
  const {
    search,
    getSearchItems,
    cart,
    getCart,
    increment,
    decrement,
    remove,
    checkout,
    user,
    requestUserAuth,
    requestUserLogout,
    checkUserLogin,
  } = props;

  return (
    <section id="header">
      <Container>
        <Row className="no-gutters">
          <Col xs="12" lg="5" className="order-lg-2" >
            <Phone
              phone={info.phone}
            >
              <UserPanel
                user={user}
                checkUserLogin={checkUserLogin}
                requestUserAuth={requestUserAuth}
                requestUserLogout={requestUserLogout}
              />
            </Phone>
          </Col>
          <Col xs="12" lg="3" className="order-lg-1" >
            <Logo
              logo={info.logo}
            />
          </Col>
          <Col xs="12" lg="4" className="order-lg-12" >
            <RightMenu>
              <Search
                getSearchItems={getSearchItems}
                items={search.items}
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
    </section>
  );
}

Header.propTypes = {
  getSearchItems: PropTypes.func.isRequired,
  search: PropTypes.objectOf(PropTypes.array).isRequired,
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.shape({
    loading: PropTypes.objectOf(PropTypes.bool),
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserAuth: PropTypes.func.isRequired,
  requestUserLogout: PropTypes.func.isRequired,
  checkUserLogin: PropTypes.func.isRequired,
};

export default Header;
