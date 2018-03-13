import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import ProfileInfo from './ProfileInfo';
import ProfileOrders from './ProfileOrders';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: false,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({ sidebar: !this.state.sidebar });
  }

  render() {
    const { userData } = this.props;

    return (
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="profile">
              <ProfileInfo
                userData={userData}
                toggleSidebar={this.toggleSidebar}
                sidebar={this.state.sidebar}
              />
              <ProfileOrders toggleSidebar={this.toggleSidebar} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Profile.defaultProps = {
  userData: {},
};

Profile.propTypes = {
  userData: PropTypes.objectOf(PropTypes.string),
};

export default Profile;
