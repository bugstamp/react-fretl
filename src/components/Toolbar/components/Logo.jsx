import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Logo({ logo }) {
  return (
    <div className="logo">
      <Link to="/">
        <h3>{logo.name}</h3>
      </Link>
      <p>{logo.slogan}</p>
    </div>
  );
}

Logo.propTypes = {
  logo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Logo;
