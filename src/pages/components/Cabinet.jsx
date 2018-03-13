import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Profile from '../../components/CabinetPage/Profile';

class Cabinet extends Component {
  componentDidMount() {
    const { checkUserAuth } = this.props;

    checkUserAuth({ redirect: true });
  }

  render() {
    const { userData } = this.props;

    return (
      <DocumentTitle title="Личный Кабинет" >
        <div className="cabinet-page">
          <div className="top" />
          <Profile userData={userData} />
        </div>
      </DocumentTitle>
    );
  }
}

Cabinet.defaultProps = {
  userData: {},
};

Cabinet.propTypes = {
  userData: PropTypes.objectOf(PropTypes.string),
  checkUserAuth: PropTypes.func.isRequired,
};

export default Cabinet;
