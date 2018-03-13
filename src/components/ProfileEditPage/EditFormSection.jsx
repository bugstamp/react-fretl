import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import FormReg from '../Forms/FormReg';

function EditFormSection({ requestUserEdit, user }) {
  return (
    <section id="edit-form-section">
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <FormReg
              userData={user.data}
              loading={user.recording}
              request={requestUserEdit}
              className="edit-form"
              title="Редактирование профиля"
              buttonText="Сохранить изменения"
              pwdRequired={false}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

EditFormSection.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  requestUserEdit: PropTypes.func.isRequired,
};

export default EditFormSection;
