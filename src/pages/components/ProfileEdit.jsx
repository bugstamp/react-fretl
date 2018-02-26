import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import ProfileEditFormLayout from '../../components/ProfileEditPage/ProfileEditFormLayout';

class ProfileEdit extends Component {
  componentDidMount() {
    const { checkUserAuth } = this.props;

    checkUserAuth({ redirect: true });
  }

  render() {
    const { user, requestUserEdit } = this.props;

    return (
      <DocumentTitle title="Редактирование профиля">
        <div className="edit-page">
          <ProfileEditFormLayout
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
