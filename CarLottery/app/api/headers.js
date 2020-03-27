import { UserData } from "../utils/global";

/* eslint no-unneeded-ternary: 0 */
const getHeaders = (header, userHeaders) => {

  const headers = userHeaders ? userHeaders : {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return header ? {
    session_key: header,
    ...headers,
  } : headers;
};

const getHeadersWithMultipartContent = (header, userHeaders) => {
  const headers = userHeaders ? userHeaders : {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return header ? {
    session_key: header,
    ...headers,
  } : headers;
};

export { getHeadersWithMultipartContent };

export default getHeaders;
