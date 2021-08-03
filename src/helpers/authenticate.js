import axios from 'axios';
// import { decodeToken } from 'api/utils/passport';

let authorization = null;

export function setAuthorizationHeader() {
  if (authorization) {
    axios.defaults.headers.common.Authorization = authorization;
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
