import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';

import ProfileInfo from './ProfileInfo';
import ProfileOrders from './ProfileOrders';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: false,
    };

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState({ sidebar: !this.state.sidebar });
  }

  render() {
    const { userData } = this.props;

    return (
      <Container>
        <Row className="no-gutters">
          <Col xs="12">
            <div className="profile">
              <CSSTransition
                in={this.state.sidebar}
                classNames="show"
              >
                <ProfileInfo
                  userData={userData}
                  toggleSideBar={this.toggleSideBar}
                />
              </CSSTransition>
              <ProfileOrders toggleSideBar={this.toggleSideBar} />
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
