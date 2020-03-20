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
  MYTICKETS_CONTEST_DETAILS_REQUEST,
  MYTICKETS_CONTEST_DETAILS_FAILURE,
  MYTICKETS_CONTEST_DETAILS_SUCCESS,
  GET_MY_LOTTERIES_REQUEST,
  GET_MY_LOTTERIES_SUCCESS,
  GET_MY_LOTTERIES_FAILURE,
  GET_LOTTERIE_WINNERS_SUCCESS,
  GET_LOTTERIE_WINNERS_FAILURE,
  GET_USER_WINNER_TICKETS_SUCCESS,
  GET_USER_WINNER_TICKETS_FAILURE,
  USER_CONTEST_DETAILS_FAILURE,
  USER_CONTEST_DETAILS_SUCCESS,
  USER_CONTEST_DETAILS_REQUEST,
  PRINT_TICKETS_SUCCESS,
  PRINT_TICKETS_REQUEST,
  PRINT_TICKETS_FAILURE,
  JOIN_LOTTERY_REQUEST,
  JOIN_LOTTERY_SUCCESS,
  JOIN_LOTTERY_FAILURE,
  UPDATED_MY_TICKETS,
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
  myContestTickets: [],
  myContestTicketsTotalPages: 1,
  currentMyContestTicketsPage: 1,
  isLoadingMyContestTickets: false,
  selectedLotterieWinnerslist: [],
  selectedContestDetails: {},
  printTicketData: '',
  needToUpdateMyTickets: false,
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
    case JOIN_LOTTERY_REQUEST:
      return {
        ...state,
        needToUpdateMyTickets: false,
      };
    case JOIN_LOTTERY_SUCCESS:
      return {
        ...state,
        needToUpdateMyTickets: true,
      };
    case JOIN_LOTTERY_FAILURE:
      return {
        ...state,
      };
    case UPDATED_MY_TICKETS:
      return {
        ...state,
        needToUpdateMyTickets: false,
      };
    case USER_CONTEST_DETAILS_REQUEST:
      return {
        ...state,
      };
    case USER_CONTEST_DETAILS_SUCCESS:
      return {
        ...state,
        selectedContestDetails: action.data.Data.contest_details,
      };
    case USER_CONTEST_DETAILS_FAILURE:
      return {
        ...state,
      };
    case MYTICKETS_CONTEST_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingMyContestTickets: true,
      };
    case MYTICKETS_CONTEST_DETAILS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const tiList = action.data.response.Data.tickets_list;
      // eslint-disable-next-line no-case-declarations
      const myTiList = action.data.current_page === 1 ? tiList : [...state.myContestTickets, ...tiList];
      return {
        ...state,
        myContestTickets: myTiList,
        myContestTicketsTotalPages: Math.ceil((action.data.response.Data.total_ticket_bought) / action.data.items_perpage),
        isLoadingMyContestTickets: false,
        currentMyContestTicketsPage: action.data.current_page,

      };
    case MYTICKETS_CONTEST_DETAILS_FAILURE:
      return {
        ...state,
        isLoadingMyContestTickets: false,
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
    case PRINT_TICKETS_SUCCESS:
      return {
        ...state,
        printTicketData: action.data.Data.tickets_view,
      };
    case PRINT_TICKETS_FAILURE:
      return {
        ...state,
        printTicketData: '',
      };
    default:
      return state;
  }
}

export default dashboardReducer;
