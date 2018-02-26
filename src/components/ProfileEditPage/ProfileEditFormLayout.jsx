import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import FormReg from '../Forms/FormReg';

function EditFormLayout({ requestUserEdit, user }) {
  return (
    <section id="edit-form-section">
      <div className="top" />
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <FormReg
              title="Редактирование профиля"
              userData={user.data}
              loading={user.recording}
              request={requestUserEdit}
              buttonText="Сохранить изменения"
              pwdRequired={false}
              className="edit-form"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

EditFormLayout.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserEdit: PropTypes.func.isRequired,
};

export default EditFormLayout;
