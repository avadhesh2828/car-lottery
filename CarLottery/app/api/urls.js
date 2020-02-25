import {
  getBaseUrl,
} from '../config/appConfig';

export const getSportsUrl = `${getBaseUrl()}/api/v1/sports`;
export const loginUrl = `${getBaseUrl()}/api/auth/user_login`;
