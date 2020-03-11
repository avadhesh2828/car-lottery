import {
  getBaseUrl,
} from '../config/appConfig';

export const getSportsUrl = `${getBaseUrl()}/api/v1/sports`;
export const loginUrl = `${getBaseUrl()}/api/auth/user_login`;
export const signupUrl = `${getBaseUrl()}/api/auth/signup`;
export const commonHotLotteriesUrl = `${getBaseUrl()}/api/common/hot_lotteries`;
export const lobbyFilterUrl = `${getBaseUrl()}/api/common/lobby_filter`;

// Image Urls
export const contestImgUrl = (imgName) => `${getBaseUrl()}/uploads/contests/${imgName}`;

export const getCountriesUrl = `${getBaseUrl()}/api/auth/get_country`;
export const getStatesbyCountryUrl = `${getBaseUrl()}/api/auth/get_state_by_country`;
export const getProfileDataUrl = `${getBaseUrl()}/api/my_profile/my_profile`;
