import React from 'react';

import PropTypes from 'prop-types';

import IconHero from '../../assets/images/icon/icon-hero.svg';

function ProfileOrders({ toggleSideBar }) {
  return (
    <div className="orders">
      <div className="orders-layout">
        <h2 className="title">
          <button
            className="button-toggle-side"
            onClick={toggleSideBar}
          >
            <IconHero />
          </button>
          Ваши заказы
        </h2>
        <div className="no-result">Вы еще не совершали покупок на нашем сайте</div>
      </div>
    </div>
  );
}

ProfileOrders.propTypes = {
  toggleSideBar: PropTypes.func.isRequired,
};

export default ProfileOrders;
