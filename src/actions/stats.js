// import axios from 'axios';
import { fetchAllValuesByModal } from './shared';
// import { handleErrors, handleResponse } from '../helpers/apiRequests';

export function fetchUserStats() {
  return fetchAllValuesByModal('userStats', {});
}

export function fetchDomainStats() {
  return fetchAllValuesByModal('domainStats', {});
}

export default fetchUserStats;
