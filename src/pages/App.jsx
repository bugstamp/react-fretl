import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Preloader from '../components/Preloader';
import Toolbar from '../components/Toolbar/';
import Footer from '../components/Footer';

import Routes, { ScrollToTop } from '../routes/';

// App styles
import '../assets/styles/index.scss';

class App extends Component {
  componentDidMount() {
    const { checkUserAuth } = this.props;

    checkUserAuth({ redirect: false });
  }

  render() {
    const { checking, loading } = this.props;

    // Preloader props
    const visible = checking.pending || loading.pending;
    const text = checking.pending ?
      'Проверка авторизации'
      :
      loading.pending ?
        'Загрузка продуктов'
        :
        'Сайт загружается';

    return (
      <ScrollToTop>
        <div className="app">
          <Preloader visible={visible} text={text} />
          <Toolbar />
          <Routes />
          <Footer />
        </div>
      </ScrollToTop>
    );
  }
}

App.propTypes = {
  checkUserAuth: PropTypes.func.isRequired,
  checking: PropTypes.objectOf(PropTypes.bool).isRequired,
  loading: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default hot(module)(App);
