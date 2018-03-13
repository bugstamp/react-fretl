import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

function TopBar({ title, onClick, isOpen }) {
  const text = !isOpen ? 'Скрыть' : 'Показать';

  return (
    <div className="topbar-wrapper">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="topbar">
              <div className="title">{title}</div>
              <button
                className="button-toggle"
                onClick={onClick}
              >
                <div className="text">{text}</div>
                <div className={`icon${isOpen ? ' is-close' : ''}`} />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default TopBar;
