export const GET_HOT_LOTTERIES_REQUEST = 'GET_HOT_LOTTERIES_REQUEST';
export const GET_HOT_LOTTERIES_SUCCESS = 'GET_HOT_LOTTERIES_SUCCESS';
export const GET_HOT_LOTTERIES_FAILURE = 'GET_HOT_LOTTERIES_FAILURE';

export const GET_LOBBY_HOT_LOTTERIES_REQUEST = 'GET_LOBBY_HOT_LOTTERIES_REQUEST';
export const GET_LOBBY_HOT_LOTTERIES_SUCCESS = 'GET_LOBBY_HOT_LOTTERIES_SUCCESS';
export const GET_LOBBY_HOT_LOTTERIES_FAILURE = 'GET_LOBBY_HOT_LOTTERIES_FAILURE';

export const LOBBY_FILTER_REQUEST = 'LOBBY_FILTER_REQUEST';
export const LOBBY_FILTER_SUCCESS = 'LOBBY_FILTER_SUCCESS';
export const LOBBY_FILTER_FAILURE = 'LOBBY_FILTER_FAILURE';

export const JOIN_LOTTERY_REQUEST = 'JOIN_LOTTERY_REQUEST';
export const JOIN_LOTTERY_SUCCESS = 'JOIN_LOTTERY_SUCCESS';
export const JOIN_LOTTERY_FAILURE = 'JOIN_LOTTERY_FAILURE';

export const MYTICKETS_FILTER_REQUEST = 'MYTICKETS_FILTER_REQUEST';
export const MYTICKETS_FILTER_SUCCESS = 'MYTICKETS_FILTER_SUCCESS';
export const MYTICKETS_FILTER_FAILURE = 'MYTICKETS_FILTER_FAILURE';

export const MYTICKETS_CONTEST_DETAILS_REQUEST = 'MYTICKETS_CONTEST_DETAILS_REQUEST';
export const MYTICKETS_CONTEST_DETAILS_SUCCESS = 'MYTICKETS_CONTEST_DETAILS_SUCCESS';
export const MYTICKETS_CONTEST_DETAILS_FAILURE = 'MYTICKETS_CONTEST_DETAILS_FAILURE';

export const GET_MY_LOTTERIES_REQUEST = 'GET_MY_LOTTERIES_REQUEST';
export const GET_MY_LOTTERIES_SUCCESS = 'GET_MY_LOTTERIES_SUCCESS';
export const GET_MY_LOTTERIES_FAILURE = 'GET_MY_LOTTERIES_FAILURE';

export const UPDATE_LOBBY_CURRENT_PAGE = 'UPDATE_LOBBY_CURRENT_PAGE';

export const GET_USER_WINNER_TICKETS_REQUEST = 'GET_USER_WINNER_TICKETS_REQUEST';
export const GET_USER_WINNER_TICKETS_SUCCESS = 'GET_USER_WINNER_TICKETS_SUCCESS';
export const GET_USER_WINNER_TICKETS_FAILURE = 'GET_USER_WINNER_TICKETS_FAILURE';

export const GET_LOTTERIE_WINNERS_REQUEST = 'GET_LOTTERIE_WINNERS_REQUEST';
export const GET_LOTTERIE_WINNERS_SUCCESS = 'GET_LOTTERIE_WINNERS_SUCCESS';
export const GET_LOTTERIE_WINNERS_FAILURE = 'GET_LOTTERIE_WINNERS_FAILURE';

export const USER_CONTEST_DETAILS_REQUEST = 'USER_CONTEST_DETAILS_REQUEST';
export const USER_CONTEST_DETAILS_SUCCESS = 'USER_CONTEST_DETAILS_SUCCESS';
export const USER_CONTEST_DETAILS_FAILURE = 'USER_CONTEST_DETAILS_FAILURE';
export const PRINT_TICKETS_REQUEST = 'PRINT_TICKETS_REQUEST';
export const PRINT_TICKETS_SUCCESS = 'PRINT_TICKETS_SUCCESS';
export const PRINT_TICKETS_FAILURE = 'PRINT_TICKETS_FAILURE';

export const DISPUTE_REQUEST = 'DISPUTE_REQUEST';
export const DISPUTE_SUCCESS = 'DISPUTE_SUCCESS';
export const DISPUTE_FAILURE = 'DISPUTE_FAILURE';
// GET SPORTS LIST
export const getHotLotteriesRequest = () => ({
  type: GET_HOT_LOTTERIES_REQUEST,
});

export const getHotLotteriesSuccess = (data) => ({
  type: GET_HOT_LOTTERIES_SUCCESS,
  data,
});

export const getHotLotteriesFailure = () => ({
  type: GET_HOT_LOTTERIES_FAILURE,
});

export const getLobbyHotLotteriesRequest = (data) => ({
  type: GET_LOBBY_HOT_LOTTERIES_REQUEST,
  data,
});

export const getLobbyHotLotteriesSuccess = (data) => ({
  type: GET_LOBBY_HOT_LOTTERIES_SUCCESS,
  data,
});

export const getLobbyHotLotteriesFailure = () => ({
  type: GET_LOBBY_HOT_LOTTERIES_FAILURE,
});

export const lobbyFilterRequest = () => ({
  type: LOBBY_FILTER_REQUEST,
});

export const lobbyFilterSuccess = (data) => ({
  type: LOBBY_FILTER_SUCCESS,
  data,
});

export const lobbyFilterFailure = () => ({
  type: LOBBY_FILTER_FAILURE,
});

export const joinLotteryRequest = (contestId) => {
  const body = {
    contest_unique_id: contestId,
  };
  return {
    type: JOIN_LOTTERY_REQUEST,
    body: JSON.stringify(body),
  };
};

export const joinLotterySuccess = (data) => ({
  type: JOIN_LOTTERY_SUCCESS,
  data,
});

export const joinLotteryFailure = () => ({
  type: JOIN_LOTTERY_FAILURE,
});
export const myTicketsFilterRequest = (data) => ({
  type: MYTICKETS_FILTER_REQUEST,
  data,
});

export const myTicketsFilterSuccess = (data) => ({
  type: MYTICKETS_FILTER_SUCCESS,
  data,
});

export const myTicketsFilterFailure = () => ({
  type: MYTICKETS_FILTER_FAILURE,
});

export const myTicketsContestDetailsRequest = (data) => ({
  type: MYTICKETS_CONTEST_DETAILS_REQUEST,
  data,
});

export const myTicketsContestDetailsSuccess = (data) => ({
  type: MYTICKETS_CONTEST_DETAILS_SUCCESS,
  data,
});

export const myTicketsContestDetailsFailure = () => ({
  type: MYTICKETS_CONTEST_DETAILS_FAILURE,
});

export const updateLobbyCurrentPage = (pageNo) => ({
  type: UPDATE_LOBBY_CURRENT_PAGE,
  pageNo,
});

export const getMyLotteriesRequest = (data) => ({
  type: GET_MY_LOTTERIES_REQUEST,
  data,
});

export const getMyLotteriesSuccess = (data) => ({
  type: GET_MY_LOTTERIES_SUCCESS,
  data,
});

export const getMyLotteriesFailure = () => ({
  type: GET_MY_LOTTERIES_FAILURE,
});

export const getUserWinnerTicketsRequest = (data) => ({
  type: GET_USER_WINNER_TICKETS_REQUEST,
  data,
});

export const getUserWinnerTicketsSuccess = (data) => ({
  type: GET_USER_WINNER_TICKETS_SUCCESS,
  data,
});

export const getUserWinnerTicketsFailure = () => ({
  type: GET_USER_WINNER_TICKETS_FAILURE,
});

export const getLotterieWinnersRequest = (data) => ({
  type: GET_LOTTERIE_WINNERS_REQUEST,
  data,
});

export const getLotterieWinnersSuccess = (data) => ({
  type: GET_LOTTERIE_WINNERS_SUCCESS,
  data,
});

export const getLotterieWinnersFailure = () => ({
  type: GET_LOTTERIE_WINNERS_FAILURE,
});

export const getUserContestDetailsRequest = (data) => ({
  type: USER_CONTEST_DETAILS_REQUEST,
  data,
});

export const getUserContestDetailsSuccess = (data) => ({
  type: USER_CONTEST_DETAILS_SUCCESS,
  data,
});

export const getUserContestDetailsFailure = () => ({
  type: USER_CONTEST_DETAILS_FAILURE,
});

export const printTicketsRequest = (data) => ({
  type: PRINT_TICKETS_REQUEST,
  data,
});

export const printTicketsSuccess = (data) => ({
  type: PRINT_TICKETS_SUCCESS,
  data,
});

export const printTicketsFailure = () => ({
  type: PRINT_TICKETS_FAILURE,
});

export const disputeRequest = (data) => ({
  type: DISPUTE_REQUEST,
  data,
});

export const disputeSuccess = (data) => ({
  type: DISPUTE_SUCCESS,
  data,
});

export const disputeFailure = () => ({
  type: DISPUTE_FAILURE,
});
