import React from 'react';

import PropTypes from 'prop-types';

import IconHero from '../../assets/images/icon/icon-hero.svg';

function ProfileOrders({ toggleSidebar }) {
  return (
    <div className="profile-orders-wrapper">
      <div className="profile-orders">
        <h2 className="title">
          <button
            className="button-toggle-sidebar"
            onClick={toggleSidebar}
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
  toggleSidebar: PropTypes.func.isRequired,
};

export default ProfileOrders;
