import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import CabinetSection from '../../components/CabinetPage/CabinetSection';

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
          <CabinetSection userData={userData} />
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
