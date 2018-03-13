import { connect } from 'react-redux';

import Preloader from './Preloader';

const mapStateToProps = ({ user, shop }) => {
  const { checkingAuth: checking } = user;
  const { loading } = shop;

  const visible = checking.pending || loading.pending;
  const text = checking.pending ?
    'Проверка авторизации'
    :
    loading.pending ?
      'Загрузка продуктов'
      :
      'Сайт загружается';

  return {
    visible,
    text,
  };
};

export default connect(mapStateToProps)(Preloader);
