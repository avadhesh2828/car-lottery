import {
  getBaseUrl,
} from '../config/appConfig';

export const getSportsUrl = `${getBaseUrl()}/api/v1/sports`;
export const loginUrl = `${getBaseUrl()}/api/auth/user_login`;
export const logoutUrl = `${getBaseUrl()}/api/logout`;
export const signupUrl = `${getBaseUrl()}/api/auth/signup`;
export const changepasswordUrl = `${getBaseUrl()}/api/my_profile/change_password`;
export const commonHotLotteriesUrl = `${getBaseUrl()}/api/common/hot_lotteries`;
export const joinContestUrl = `${getBaseUrl()}/api/contest/join_contest`;
export const lobbyFilterUrl = `${getBaseUrl()}/api/common/lobby_filter`;
export const lobbyListUrl = `${getBaseUrl()}/api/common/lotteries_list`;
export const forgetpasswordUrl = `${getBaseUrl()}/api/auth/forgot_password`;
// My Tickets
export const myTicketsFilterUrl = `${getBaseUrl()}/api/contest/my_lotteries_filter`;
export const myLotteriesUrl = `${getBaseUrl()}/api/contest/my_lotteries`;
export const lotteriesWinnerUrl = `${getBaseUrl()}/api/common/lotterie_winners`;
export const userWinnerTicketsUrl = `${getBaseUrl()}/api/contest/user_Winner_tickets`;
export const usercontestdetailsUrl = `${getBaseUrl()}/api/contest/user_contest_details`;
export const myTicketsContestDetailsUrl = `${getBaseUrl()}/api/contest/my_tickets`;
// Safer Gambling
export const getDepositLimitUrl = `${getBaseUrl()}/api/safer_gambling/get_deposit_limit`;
export const setDepositLimitUrl = `${getBaseUrl()}/api/safer_gambling/set_deposit_limit`;
export const getWagerLimitUrl = `${getBaseUrl()}/api/safer_gambling/get_wager_limit`;
export const setWagerLimitUrl = `${getBaseUrl()}/api/safer_gambling/set_wager_limit`;
export const delDepositLimitUrl = `${getBaseUrl()}/api/safer_gambling/delete_deposit_limit`;
export const delWagerLimitUrl = `${getBaseUrl()}/api/safer_gambling/delete_wager_limit`;
export const selfTimeoutUrl = `${getBaseUrl()}/api/safer_gambling/self_timeout`;
export const suspendUserUrl = `${getBaseUrl()}/api/auth/suspend`;
// Advertisement
export const headerAdUrl = `${getBaseUrl()}/api/common/get_all_header_advertisement`;
export const FooterAdUrl = `${getBaseUrl()}/api/common/get_all_footer_advertisement`;
// Image Urls
export const contestImgUrl = (imgName) => `${getBaseUrl()}/uploads/contests/${imgName}`;
export const adImgUrl = (imgName) => `${getBaseUrl()}/uploads/advertisement/${imgName}`;
export const userProfileImgUrl = (imgName) => `${getBaseUrl()}/uploads/user-profile-img/${imgName}`;
export const profileThumbImgUrl = (imgName) => `${getBaseUrl()}/uploads/user-profile-img-thumb/${imgName}`;

export const getCountriesUrl = `${getBaseUrl()}/api/auth/get_country`;
export const getStatesbyCountryUrl = `${getBaseUrl()}/api/auth/get_state_by_country`;
export const getProfileDataUrl = `${getBaseUrl()}/api/my_profile/my_profile`;
export const updateProfileDataUrl = `${getBaseUrl()}/api/my_profile/update_profile`;
