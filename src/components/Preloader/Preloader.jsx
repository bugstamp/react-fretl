import React from 'react';
import PropTypes from 'prop-types';

function Preloader({ visible, text }) {
  return (
    <div className={`preloader${!visible ? ' is-hidden' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-icon">
          <i className="icon" />
        </div>
        <div className="preloader-text">
          <h1>Fretl</h1>
          <p>
            {text}
            <span> .</span>
            <span> .</span>
            <span> .</span>
          </p>
        </div>
      </div>
    </div>
  );
}

Preloader.defaultProps = {
  visible: true,
};

Preloader.propTypes = {
  visible: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default Preloader;
