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
  GET_LOTTERIE_WINNERS_SUCCESS,
  GET_LOTTERIE_WINNERS_FAILURE,
  GET_USER_WINNER_TICKETS_SUCCESS,
  GET_USER_WINNER_TICKETS_FAILURE,
} from '../actions/dashboardActions';
import { GET_HEADER_AD_SUCCESS, GET_FOOTER_AD_SUCCESS } from '../actions/advertisementActions';

const initialState = {
  hotLotteries: [],
  lobbyHotLotteries: [],
  myLotteries: [],
  maxEntryFee: 10000,
  minEntryFee: 0,
  lobbyListTotalPages: 1,
  isLoadingHotLottery: false,
  isLoadingLobbyLottery: false,
  currentLobbyPage: 1,
  myTicketMinEntryFee: 0,
  myTicketMaxEntryFee: 10000,
  isLoadingMyTickets: false,
  currentMyTicketsPage: 1,
  myTicketsTotalPages: 1,
  userWinnerTickets: [],
  selectedLotterieWinnerslist: [],
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
        minEntryFee: action.data.Data.min_entry_fee ? parseInt(action.data.Data.min_entry_fee) : 0,
        maxEntryFee: action.data.Data.max_entry_fee ? parseInt(action.data.Data.max_entry_fee) : 100,
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
        myTicketMinEntryFee: action.data.Data.min_entry_fee ? parseInt(action.data.Data.min_entry_fee) : 0,
        myTicketMaxEntryFee: action.data.Data.max_entry_fee ? parseInt(action.data.Data.max_entry_fee) : 100,
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
    case GET_LOTTERIE_WINNERS_SUCCESS:
      return {
        ...state,
        selectedLotterieWinnerslist: action.data.Data.lotterie_winners,
      };
    case GET_LOTTERIE_WINNERS_FAILURE:
      return {
        ...state,
      };
    case GET_USER_WINNER_TICKETS_SUCCESS:
      return {
        ...state,
        userWinnerTickets: action.data.Data.user_winner_tickets,
      };
    case GET_USER_WINNER_TICKETS_FAILURE:
      return {
        ...state,
      };
    case GET_HEADER_AD_SUCCESS:
      return {
        ...state,
        headerAd: action.data.Data,
      };
    case GET_FOOTER_AD_SUCCESS:
      return {
        ...state,
        footerAd: action.data.Data,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
