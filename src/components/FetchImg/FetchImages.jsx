import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (inputValue, page) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${page}&key=41281960-4f851dde922e1c31c346e4445&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
    return {
      id,
      webformatURL,
      largeImageURL,
      tags,
    };
  });
};
export default fetchImages;
