import React, { useState, useEffect, useCallback } from 'react';
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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataTotal, setDataTotal] = useState(0);

  const fetchDataCallback = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchImages(searchQuery, page, perPage);
      console.log(response.hits);
      console.log(response.totalHits);
      const { hits, totalHits } = response;
      setData(hits);
      setLoadMoreBtn(hits.length < totalHits);
      setDataTotal(totalHits && totalHits > 0);
      setPage(1);
      if (totalHits) {
        Notify.success(`Hurray, we get ${totalHits} results!`);
      }
      if (!loadMoreBtn && perPage >= totalHits) {
        console.log(perPage);
        console.log(dataTotal);
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      Notify.failure('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [page, perPage, searchQuery, dataTotal, loadMoreBtn]);

  const loadMore = event => {
    if (event) {
      event.preventDefault();
    }
    setPerPage(perPage + 12);
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  const handleSubmitInput = value => {
    setSearchQuery(value);
    setPage(1);
    setData([]);
    setPerPage(12);
    fetchDataCallback();
    console.log(value);
  };

  const handleClickImage = imageURL => {
    setShowModal(true);
    setSelectedImage(imageURL);
  };

  const onClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      {showModal && (
        <Modal
          largeImageUrl={selectedImage}
          onClose={onClose}
          onClick={handleClickImage}
        />
      )}
      <Loader loading={isLoading} />
      <SearchBar onSubmit={handleSubmitInput} />
      {data && (
        <ImageGallery>
          <ImageGalleryItem data={data} onClick={handleClickImage} />
        </ImageGallery>
      )}
      {loadMoreBtn && <Button onClick={event => loadMore(event)} />}
    </>
  );
};

export default App;
