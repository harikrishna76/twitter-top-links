import axios from 'axios';
import { handleErrors, handleResponse } from '../helpers/apiRequests';

export function getUserDetails() {
  return axios
    .get(`/api/users/me`)
    .then(handleResponse)
    .catch(handleErrors);
}

export default getUserDetails;
