import axios from 'axios';
import { handleErrors, handleResponse } from '../helpers/apiRequests';

export async function fetchAllValuesByModal(modal, queryParams = {}) {
  return axios
    .get(`/api/${modal}`, { params: queryParams })
    .then(handleResponse)
    .catch(handleErrors);
}

export default fetchAllValuesByModal;
