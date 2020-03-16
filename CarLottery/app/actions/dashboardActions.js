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
