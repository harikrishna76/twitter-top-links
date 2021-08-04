import { fetchAllValuesByModal } from './shared';

export function fetchUserStats() {
  return fetchAllValuesByModal('userStats', {});
}

export function fetchDomainStats() {
  return fetchAllValuesByModal('domainStats', {});
}

export default fetchUserStats;
