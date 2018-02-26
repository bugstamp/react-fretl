import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

function Cart({
  isOpen,
  items,
  increment,
  decrement,
  remove,
  checkout,
  totalSum,
}) {
  return (
    <div className={`cart${isOpen ? ' show' : ''}`} >
      {items.length === 0 ?
        <p>Ваша корзина пуста</p>
        :
        <div>
          <div className="list">
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
          <div className="result">
            <div className="total">
              Всего: <span>{totalSum} грн</span>
            </div>
            <button className="checkout" onClick={checkout} >
              Оформить заказ
            </button>
          </div>
        </div>}
    </div>
  );
}

Cart.propTypes = {
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

export default Cart;
