import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from './FetchImg/FetchImages';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataTotal, setDataTotal] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchImages(searchQuery, 1);
      console.log(response);
      setData(response.hits);
      setLoadMoreBtn(response.totalHits > per_page);
      setDataTotal(response.totalHits);
      if (per_page === 12) {
        Notify.success(`Hurray, we get ${data.totalHits} results!`);
      }
    } catch (error) {
      Notify.failure('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPerPage(prev => prev + 12);
    fetchData();
  };

  const handleSubmitInput = value => {
    console.log(value);

    setSearchQuery(value);
    setPage(1);
    setPerPage(12);
    fetchData();
  };

  const handleClickImage = imageURL => {
    setShowModal(true);
    setSelectedImage(imageURL);
  };

  const onClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!loadMoreBtn && per_page >= dataTotal) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  return (
    <>
      {showModal && (
        <Modal largeImageUrl={selectedImage} onClose={onClose} hits={data} />
      )}
      <Loader loading={isLoading} />
      <SearchBar onSubmit={handleSubmitInput} />
      <ImageGallery>
        <ImageGalleryItem data={data} onClick={handleClickImage} />
      </ImageGallery>
      {loadMoreBtn && <Button onClick={loadMore} />}
    </>
  );
};

export default App;
