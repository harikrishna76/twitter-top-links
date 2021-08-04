import { fetchAllValuesByModal } from './shared';

export function fetchLocations() {
  return fetchAllValuesByModal('locations');
}

export default fetchLocations;
