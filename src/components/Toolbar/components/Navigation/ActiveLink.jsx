import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function ActiveLink({ children, ...rest }) {
  return (
    <NavLink activeClassName="link-active" {...rest}>{children}</NavLink>
  );
}

ActiveLink.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ActiveLink;
