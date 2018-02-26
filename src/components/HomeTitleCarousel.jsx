import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

// Imported images for slider
import imgVegetables from '../assets/images/background/home-title-link/vegetables-220x220.png';
import imgFruits from '../assets/images/background/home-title-link/fruit-220x220.png';
import imgGreenery from '../assets/images/background/home-title-link/greenery-220x220.png';
import imgHome from '../assets/images/background/home-title-link/home-220x220.png';

const slides = [{
  title: 'Овощи',
  img: imgVegetables,
  route: '/category/vegetables',
}, {
  title: 'Фрукты',
  img: imgFruits,
  route: '/category/fruits',
}, {
  title: 'Зелень',
  img: imgGreenery,
  route: '/category/greenery',
}, {
  title: 'Домашние продукты',
  img: imgHome,
  route: '/category/home',
}];

const SlideArrow = (props) => {
  const { className, onClick } = props;

  return (
    <button className={className} onClick={onClick} />
  );
};

class HomeTitleCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 1000,
      arrows: true,
      prevArrow: <SlideArrow />,
      nextArrow: <SlideArrow />,
      responsive: [{
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      }],
      lazyLoad: true,
    };
  }

  render() {
    const settings = this.state;

    return (
      <Slider {...settings}>

        {slides.map((slide, index) => (
          <div key={index}>
            <NavLink to={slide.route}>
              <img src={slide.img} alt={slide.title} />
              <p>{slide.title}</p>
            </NavLink>
          </div>
        ))}

      </Slider>
    );
  }
}

SlideArrow.defaultProps = {
  className: 'slick-arrow',
  onClick: null,
};

SlideArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default HomeTitleCarousel;
