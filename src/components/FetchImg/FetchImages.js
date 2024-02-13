import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page, perPage) => {
  try {
    const response = await axios.get(
      `?q=${searchQuery}&page=${page}&key=41281960-4f851dde922e1c31c346e4445&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    const data = response.data;
    // console.log(response.data.hits);
    if (data && data.hits) {
      return data;
    } else {
      // throw new Error('Invalid response from API');
      Notify.failure('Invalid response from API');
      return null;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notify.failure('Error fetching images. Try again later.');
    return null;
  }
};
export default fetchImages;
