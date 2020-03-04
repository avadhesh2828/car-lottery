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
  MYTICKETS_FILTER_REQUEST,
  MYTICKETS_FILTER_SUCCESS,
  MYTICKETS_FILTER_FAILURE,
  GET_MY_LOTTERIES_REQUEST,
  GET_MY_LOTTERIES_SUCCESS,
  GET_MY_LOTTERIES_FAILURE,
} from '../actions/dashboardActions';

const initialState = {
  hotLotteries: [],
  lobbyHotLotteries: [],
  myLotteries: [],
  maxEntryFee: 100000000,
  minEntryFee: 0,
  lobbyListTotalPages: 1,
  isLoadingHotLottery: false,
  isLoadingLobbyLottery: false,
  currentLobbyPage: 1,
  myTicketMinEntryFee: 0,
  myTicketMaxEntryFee: 100000,
  isLoadingMyTickets: false,
  currentMyTicketsPage: 1,
  myTicketsTotalPages: 1,
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
      // console.log('x==', Math.ceil((action.data.response.Data.total_lotteries) / action.data.item_perpage), '+', action.data.response.Data.total_lotteries, '--', action.data.item_perpage);
      return {
        ...state,
        lobbyHotLotteries: list,
        lobbyListTotalPages: Math.ceil((action.data.response.Data.total_lotteries) / action.data.items_perpage),
        isLoadingLobbyLottery: false,
        currentLobbyPage: action.data.current_page,
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
    case MYTICKETS_FILTER_REQUEST:
      return {
        ...state,
      };
    case MYTICKETS_FILTER_SUCCESS:
      return {
        ...state,
        myTicketMinEntryFee: action.data.Data.min_entry_fee,
        myTicketMaxEntryFee: action.data.Data.max_entry_fee,
      };
    case MYTICKETS_FILTER_FAILURE:
      return {
        ...state,
      };
    case GET_MY_LOTTERIES_REQUEST:
      return {
        ...state,
        isLoadingLobbyLottery: true,
      };
    case GET_MY_LOTTERIES_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const mylotteryList = action.data.response.Data.lotteries_list;
      // eslint-disable-next-line no-case-declarations
      const mylist = action.data.current_page === 1 ? mylotteryList : [...state.lobbyHotLotteries, ...mylotteryList];
      return {
        ...state,
        myLotteries: mylist,
        myTicketsTotalPages: Math.ceil((action.data.response.Data.total_lotteries) / action.data.items_perpage),
        isLoadingMyTickets: false,
        currentMyTicketsPage: action.data.current_page,
      };
    case GET_MY_LOTTERIES_FAILURE:
      return {
        ...state,
        myLotteries: [],
        isLoadingMyTickets: false,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
