import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import EditFormSection from '../../components/ProfileEditPage/EditFormSection';

class ProfileEdit extends Component {
  componentDidMount() {
    const { checkUserAuth } = this.props;

    checkUserAuth({ redirect: true });
  }

  render() {
    const { user, requestUserEdit } = this.props;

    return (
      <DocumentTitle title="Редактирование профиля">
        <div className="profile-edit-page">
          <div className="top" />
          <EditFormSection
            user={user}
            requestUserEdit={requestUserEdit}
          />
        </div>
      </DocumentTitle>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserEdit: PropTypes.func.isRequired,
  checkUserAuth: PropTypes.func.isRequired,
};

export default ProfileEdit;
