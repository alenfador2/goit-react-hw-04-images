import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data, onClick }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  } else {
    return (
      <>
        {data.map(({ id, largeImageURL, webformatURL, tags }) => (
          <li
            className={css['gallery-item']}
            key={id}
            onClick={() => onClick(largeImageURL)}
          >
            <img
              className={css.item_img}
              src={webformatURL}
              alt={tags}
              id={id}
            />
          </li>
        ))}
      </>
    );
  }
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default ImageGalleryItem;
