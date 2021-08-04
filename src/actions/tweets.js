import { fetchAllValuesByModal } from './shared';

export function fetchTweets(queryParams) {
  return fetchAllValuesByModal('tweets', queryParams);
}

export default fetchTweets;
