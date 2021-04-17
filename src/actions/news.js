import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

export const getNews = (data) => {
  return async (dispatch) => {
    try {
      let { perPage, page } = data;

      const news = await axios.get(
        `${BASE_API_URL}/article?perPage=${perPage}&page=${page}`
      );

      return dispatch(setNews(news.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setNews = (news) => ({
  type: 'SET_NEWS',
  news
});

