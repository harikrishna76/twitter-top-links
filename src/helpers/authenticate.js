import axios from 'axios';

let authorization = null;

export function setAuthorizationHeader(forceSet = true) {
  if (authorization) {
    axios.defaults.headers.common.Authorization = authorization;
  }
  if (forceSet && !axios.defaults.headers.common.Authorization) {
    if (typeof localStorage !== 'undefined') {
      axios.defaults.headers.common.Authorization = localStorage.getItem(
        'authorization',
      );
    }
  }
}

export default function authenticate(params = {}) {
  const { route } = params;
  let status = true;
  if (typeof window !== 'undefined' && localStorage !== 'undefined') {
    if (authorization === null) {
      authorization = localStorage.getItem('authorization');
      setAuthorizationHeader(authorization);
    }
    if (route.authenticate && !authorization) {
      status = false;
    }
  }
  return status;
}
