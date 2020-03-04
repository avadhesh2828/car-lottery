import {
  // common lottery
  GET_HOT_LOTTERIES_SUCCESS,
  GET_HOT_LOTTERIES_FAILURE,
  LOBBY_FILTER_SUCCESS,
  LOBBY_FILTER_FAILURE,
  GET_LOBBY_HOT_LOTTERIES_SUCCESS,
  GET_LOBBY_HOT_LOTTERIES_FAILURE,
  GET_HOT_LOTTERIES_REQUEST,
  GET_LOBBY_HOT_LOTTERIES_REQUEST,
  UPDATE_LOBBY_CURRENT_PAGE,
} from '../actions/dashboardActions';

const initialState = {
  hotLotteries: [],
  lobbyHotLotteries: [],
  maxEntryFee: 100000000,
  minEntryFee: 0,
  lobbyListTotalPages: 1,
  isLoadingHotLottery: false,
  isLoadingLobbyLottery: false,
  currentLobbyPage: 1,
};

function dashboardReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_HOT_LOTTERIES_REQUEST:
      return {
        ...state,
        isLoadingHotLottery: true,
      };
    case GET_HOT_LOTTERIES_SUCCESS:
      return {
        ...state,
        hotLotteries: action.data.Data.hot_lotteries,
        isLoadingHotLottery: false,
      };
    case GET_HOT_LOTTERIES_FAILURE:
      return {
        ...state,
        hotLotteries: [],
        isLoadingHotLottery: false,
      };
    case GET_LOBBY_HOT_LOTTERIES_REQUEST:
      return {
        ...state,
        isLoadingLobbyLottery: true,
      };
    case GET_LOBBY_HOT_LOTTERIES_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const lotteryList = action.data.response.Data.lotteries_list;
      // eslint-disable-next-line no-case-declarations
      const list = action.data.current_page === 1 ? lotteryList : [...state.lobbyHotLotteries, ...lotteryList];
      return {
        ...state,
        lobbyHotLotteries: list,
        lobbyListTotalPages: Math.ceil((action.data.response.Data.total_lotteries) / action.data.item_perpage),
        isLoadingLobbyLottery: false,
        current_page: action.data.current_page,
      };
    case GET_LOBBY_HOT_LOTTERIES_FAILURE:
      return {
        ...state,
        lobbyHotLotteries: [],
        isLoadingLobbyLottery: false,
      };
    case UPDATE_LOBBY_CURRENT_PAGE:
      return {
        ...state,
        currentLobbyPage: action.pageNo,
      };
    case LOBBY_FILTER_SUCCESS:
      return {
        ...state,
        minEntryFee: parseInt(action.data.Data.min_entry_fee),
        maxEntryFee: parseInt(action.data.Data.max_entry_fee),
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
