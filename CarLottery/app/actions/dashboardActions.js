export const GET_HOT_LOTTERIES_REQUEST = 'GET_HOT_LOTTERIES_REQUEST';
export const GET_HOT_LOTTERIES_SUCCESS = 'GET_HOT_LOTTERIES_SUCCESS';
export const GET_HOT_LOTTERIES_FAILURE = 'GET_HOT_LOTTERIES_FAILURE';

export const GET_LOBBY_HOT_LOTTERIES_REQUEST = 'GET_LOBBY_HOT_LOTTERIES_REQUEST';
export const GET_LOBBY_HOT_LOTTERIES_SUCCESS = 'GET_LOBBY_HOT_LOTTERIES_SUCCESS';
export const GET_LOBBY_HOT_LOTTERIES_FAILURE = 'GET_LOBBY_HOT_LOTTERIES_FAILURE';

export const LOBBY_FILTER_REQUEST = 'LOBBY_FILTER_REQUEST';
export const LOBBY_FILTER_SUCCESS = 'LOBBY_FILTER_SUCCESS';
export const LOBBY_FILTER_FAILURE = 'LOBBY_FILTER_FAILURE';

export const UPDATE_LOBBY_CURRENT_PAGE = 'UPDATE_LOBBY_CURRENT_PAGE';

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

export const updateLobbyCurrentPage = (pageNo) => ({
  type: UPDATE_LOBBY_CURRENT_PAGE,
  pageNo,
});
