import axios from 'axios';
import { handleErrors, handleResponse } from '../helpers/apiRequests';

export async function fetchTweetGeneratorTask() {
  return axios
    .get(`/api/tasks/tweetGenerator`)
    .then(handleResponse)
    .catch(handleErrors);
}

export default fetchTweetGeneratorTask;
