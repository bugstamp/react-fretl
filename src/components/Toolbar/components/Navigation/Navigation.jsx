import React from 'react';
// import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

import ActiveLink from './ActiveLink';

function Navigation() {
  return (
    <ul className="navigation" >
      <li><ActiveLink to="/category/fruits">Фрукты</ActiveLink></li>
      <li><ActiveLink to="/category/vegetables">Овощи</ActiveLink></li>
      <li><ActiveLink to="/category/greenery">Зелень</ActiveLink></li>
      <li><ActiveLink to="/category/home">Домашние продукты</ActiveLink></li>
      <li><HashLink to="/#newest" >О нас</HashLink></li>
      <li><HashLink to="/#stock" >Гарантия и доставка</HashLink></li>
    </ul>
  );
}

export default Navigation;
