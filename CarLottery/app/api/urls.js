import {
  getBaseUrl,
} from '../config/appConfig';

export const getSportsUrl = `${getBaseUrl()}/api/v1/sports`;
export const loginUrl = `${getBaseUrl()}/api/auth/user_login`;
export const signupUrl = `${getBaseUrl()}/api/auth/signup`;
export const commonHotLotteriesUrl = `${getBaseUrl()}/api/common/hot_lotteries`;
export const lobbyFilterUrl = `${getBaseUrl()}/api/common/lobby_filter`;
export const lobbyListUrl = `${getBaseUrl()}/api/common/lotteries_list`;
export const myTicketsFilterUrl = `${getBaseUrl()}/api/contest/my_lotteries_filter`;
export const myLotteriesUrl = `${getBaseUrl()}/api/contest/my_lotteries`;

// Image Urls
export const contestImgUrl = (imgName) => `${getBaseUrl()}/uploads/contests/${imgName}`;
