import {
  // common lottery
  GET_HOT_LOTTERIES_SUCCESS,
  GET_HOT_LOTTERIES_FAILURE,
  LOBBY_FILTER_SUCCESS,
  LOBBY_FILTER_FAILURE,
  GET_LOBBY_HOT_LOTTERIES_SUCCESS,
  GET_LOBBY_HOT_LOTTERIES_FAILURE,
} from '../actions/dashboardActions';

const initialState = {
  hotLotteries: [],
  lobbyHotLotteries: [],
  maxEntryFee: 100,
  minEntryFee: 0,
};

function dashboardReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_HOT_LOTTERIES_SUCCESS:
      return {
        ...state,
        hotLotteries: action.data.Data.hot_lotteries,
      };
    case GET_HOT_LOTTERIES_FAILURE:
      return {
        ...state,
        hotLotteries: [],
      };
    case GET_LOBBY_HOT_LOTTERIES_SUCCESS:
      return {
        ...state,
        lobbyHotLotteries: action.data.Data.hot_lotteries,
      };
    case GET_LOBBY_HOT_LOTTERIES_FAILURE:
      return {
        ...state,
        lobbyHotLotteries: [],
      };
    case LOBBY_FILTER_SUCCESS:
      return {
        ...state,
        minEntryFee: action.data.Data.min_entry_fee,
        maxEntryFee: action.data.Data.max_entry_fee,
      };
    case LOBBY_FILTER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
