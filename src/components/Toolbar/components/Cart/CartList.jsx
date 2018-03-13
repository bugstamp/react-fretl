import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

function CartList({
  isOpen,
  items,
  increment,
  decrement,
  remove,
  checkout,
  totalSum,
}) {
  return (
    <div className={`dropdown ${isOpen ? 'is-open' : ''}`} >
      {items.length === 0 ?
        <p>Ваша корзина пуста</p>
        :
        <div className="cart-list">
          <div className="list-items">
            {items.map((item, index) => (
              <Item
                key={index}
                product={item}
                increment={() => increment(item.productId)}
                decrement={() => decrement(item.productId)}
                remove={() => remove(item.productId)}
              />),
            )}
          </div>
          <div className="cart-result">
            <div className="total">
              Всего: <span>{totalSum} грн</span>
            </div>
            <button className="button no-effect button-checkout" onClick={checkout} >
              Оформить заказ
            </button>
          </div>
        </div>}
    </div>
  );
}

CartList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  totalSum: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default CartList;
