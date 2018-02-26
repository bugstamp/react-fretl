import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import IconEdit from '../../assets/images/icon/icon-edit.svg';
import IconHero from '../../assets/images/icon/icon-hero.svg';
import IconPhone from '../../assets/images/icon/icon-phone.svg';
import IconEmail from '../../assets/images/icon/icon-email.svg';
import IconHome from '../../assets/images/icon/icon-home.svg';
import IconCash from '../../assets/images/icon/icon-cash.svg';

function ProfileInfo({ userData, toggleSideBar }) {
  return (
    <div className="side-bar">
      <div className="side-bar-layout">
        <button
          className="close-button"
          onClick={toggleSideBar}
        >
          <span />
          <span className="rot" />
        </button>
        <div className="list">
          <div className="list-row edit">
            <IconEdit className="icon" />
            <p>
              <NavLink
                className="link"
                to="/cabinet/edit"
              >Редактировать профиль</NavLink>
            </p>
          </div>
          <div className="list-row username">
            <IconHero className="icon" />
            <p>{ userData.fullname }</p>
          </div>
          <div className="list-row">
            <IconPhone className="icon" />
            <p>{ userData.phone }</p>
          </div>
          <div className="list-row">
            <IconEmail className="icon" />
            <p>{ userData.email }</p>
          </div>
          <div className="list-row home">
            <IconHome className="icon" />
            <p>{ userData.address }</p>
          </div>
          <div className="list-row">
            <IconCash className="icon" />
            <p>на вашем счету: 0.00 грн</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileInfo.defaultProps = {
  userData: {},
};

ProfileInfo.propTypes = {
  userData: PropTypes.objectOf(PropTypes.string),
  toggleSideBar: PropTypes.func.isRequired,
};

export default ProfileInfo;
