// import axios from 'axios';
import { fetchAllValuesByModal } from './shared';
// import { handleErrors, handleResponse } from '../helpers/apiRequests';

export function getTweets(queryParams) {
  return fetchAllValuesByModal('tweets', queryParams);
}

export default getTweets;
