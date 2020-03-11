import {
  GET_DEPOSIT_LIMIT_MONTHS_REQUEST,
  GET_DEPOSIT_LIMIT_MONTHS_FAILURE,
  GET_DEPOSIT_LIMIT_MONTHS_SUCCESS,
  GET_DEPOSIT_LIMIT_WEEKS_REQUEST,
  GET_DEPOSIT_LIMIT_WEEKS_FAILURE,
  GET_DEPOSIT_LIMIT_WEEKS_SUCCESS,
  GET_DEPOSIT_LIMIT_DAYS_REQUEST,
  GET_DEPOSIT_LIMIT_DAYS_SUCCESS,
  GET_DEPOSIT_LIMIT_DAYS_FAILURE,
  SET_DEPOSIT_LIMIT_MONTHS_REQUEST,
  SET_DEPOSIT_LIMIT_MONTHS_SUCCESS,
  SET_DEPOSIT_LIMIT_MONTHS_FAILURE,
  SET_DEPOSIT_LIMIT_WEEKS_REQUEST,
  SET_DEPOSIT_LIMIT_WEEKS_FAILURE,
  SET_DEPOSIT_LIMIT_WEEKS_SUCCESS,
  SET_DEPOSIT_LIMIT_DAYS_REQUEST,
  SET_DEPOSIT_LIMIT_DAYS_SUCCESS,
  SET_DEPOSIT_LIMIT_DAYS_FAILURE,
  // ==
  GET_WAGER_LIMIT_MONTHS_REQUEST,
  GET_WAGER_LIMIT_MONTHS_FAILURE,
  GET_WAGER_LIMIT_MONTHS_SUCCESS,
  GET_WAGER_LIMIT_WEEKS_REQUEST,
  GET_WAGER_LIMIT_WEEKS_FAILURE,
  GET_WAGER_LIMIT_WEEKS_SUCCESS,
  GET_WAGER_LIMIT_DAYS_REQUEST,
  GET_WAGER_LIMIT_DAYS_SUCCESS,
  GET_WAGER_LIMIT_DAYS_FAILURE,
  SET_WAGER_LIMIT_MONTHS_REQUEST,
  SET_WAGER_LIMIT_MONTHS_SUCCESS,
  SET_WAGER_LIMIT_MONTHS_FAILURE,
  SET_WAGER_LIMIT_WEEKS_REQUEST,
  SET_WAGER_LIMIT_WEEKS_FAILURE,
  SET_WAGER_LIMIT_WEEKS_SUCCESS,
  SET_WAGER_LIMIT_DAYS_REQUEST,
  SET_WAGER_LIMIT_DAYS_SUCCESS,
  SET_WAGER_LIMIT_DAYS_FAILURE,
} from '../actions/saferGamblingActions';

const initialState = {

};

function saferGamblingReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    // case GET_DEPOSIT_LIMIT_REQUEST:
    //   return {
    //     ...state,
    //   };
    case GET_DEPOSIT_LIMIT_MONTHS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        monthDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case GET_DEPOSIT_LIMIT_WEEKS_SUCCESS:
      return {
        ...state,
        weekDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case GET_DEPOSIT_LIMIT_DAYS_SUCCESS:
      return {
        ...state,
        dayDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case GET_DEPOSIT_LIMIT_MONTHS_FAILURE:
    case GET_DEPOSIT_LIMIT_WEEKS_FAILURE:
    case GET_DEPOSIT_LIMIT_DAYS_FAILURE:
      return {
        ...state,
      };
    case SET_DEPOSIT_LIMIT_MONTHS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        // monthDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case SET_DEPOSIT_LIMIT_WEEKS_SUCCESS:
      return {
        ...state,
        // weekDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case SET_DEPOSIT_LIMIT_DAYS_SUCCESS:
      return {
        ...state,
        // dayDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case SET_DEPOSIT_LIMIT_MONTHS_FAILURE:
    case SET_DEPOSIT_LIMIT_WEEKS_FAILURE:
    case SET_DEPOSIT_LIMIT_DAYS_FAILURE:
      return {
        ...state,
      };
    // case GET_WAGER_LIMIT_REQUEST:
    //   return {
    //     ...state,
    //   };
    case GET_WAGER_LIMIT_MONTHS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        monthWagerLimitInfo: action.data.Data.Wager_limit_info[0],
      };
    case GET_WAGER_LIMIT_WEEKS_SUCCESS:
      return {
        ...state,
        weekWagerLimitInfo: action.data.Data.Wager_limit_info[0],
      };
    case GET_WAGER_LIMIT_DAYS_SUCCESS:
      return {
        ...state,
        dayWagerLimitInfo: action.data.Data.Wager_limit_info[0],
      };
    case GET_WAGER_LIMIT_MONTHS_FAILURE:
    case GET_WAGER_LIMIT_WEEKS_FAILURE:
    case GET_WAGER_LIMIT_DAYS_FAILURE:
      return {
        ...state,
      };
    case SET_WAGER_LIMIT_MONTHS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        // monthDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case SET_WAGER_LIMIT_WEEKS_SUCCESS:
      return {
        ...state,
        // weekDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case SET_WAGER_LIMIT_DAYS_SUCCESS:
      return {
        ...state,
        // dayDepositLimitInfo: action.data.Data.Deposit_limit_info[0],
      };
    case SET_WAGER_LIMIT_MONTHS_FAILURE:
    case SET_WAGER_LIMIT_WEEKS_FAILURE:
    case SET_WAGER_LIMIT_DAYS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default saferGamblingReducer;
