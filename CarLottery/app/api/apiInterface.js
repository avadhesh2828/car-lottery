import { api } from './api';
import getHeaders, { getHeadersWithMultipartContent } from './headers';
import { UserData } from '../utils/global';

const apiCall = (url, method, body, headers) => api(
  url,
  method,
  getHeaders(UserData.SessionKey, headers),
  body,
);

const apiCallWithMultipartContent = (url, method, body, headers) => api(
  url,
  method,
  getHeadersWithMultipartContent(UserData.SessionKey, headers),
  body,
);

export { apiCall, apiCallWithMultipartContent };
