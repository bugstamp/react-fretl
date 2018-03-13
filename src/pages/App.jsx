import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Preloader from '../components/Preloader/';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';

import Routes, { ScrollToTop } from '../routes/';

import { checkUserAuth } from '../actions/';

// App styles
import '../assets/styles/index.scss';

class App extends Component {
  componentDidMount() {
    const { checkAuth } = this.props;

    checkAuth({ redirect: false });
  }

  render() {
    return (
      <ScrollToTop>
        <div className="app">
          <Preloader />
          <Toolbar />
          <Routes />
          <Footer />
        </div>
      </ScrollToTop>
    );
  }
}

App.propTypes = {
  checkAuth: PropTypes.func.isRequired,
};

export default withRouter(
  hot(module)(connect(null, { checkAuth: checkUserAuth })(App)),
);
