import { api } from './api';
import getHeaders from './headers';
import { UserData } from '../utils/global';

const apiCall = (url, method, body, headers) => api(
  url,
  method,
  getHeaders(UserData.BearerToken, headers),
  body,
);

export { apiCall };
