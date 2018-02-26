import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function CabinetLink() {
  return (
    <NavLink
      to="/cabinet"
      activeClassName="checked"
      className="link link-sign-in"
    >
    Кабинет
    </NavLink>
  );
}

export default CabinetLink;
