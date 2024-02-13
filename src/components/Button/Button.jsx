import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fetchMoreImages = async event => {
    if (onClick) {
      setIsLoading(true);
      event.preventDefault();
      try {
        await onClick();
      } catch (error) {
        console.error('Error fetching more images:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <button
        className={css.load_more_btn}
        onClick={event => fetchMoreImages(event)}
        disabled={isLoading}
      >
        Load More
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
