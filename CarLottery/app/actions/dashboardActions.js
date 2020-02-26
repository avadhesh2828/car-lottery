export const GET_HOT_LOTTERIES_REQUEST = 'GET_HOT_LOTTERIES_REQUEST';
export const GET_HOT_LOTTERIES_SUCCESS = 'GET_HOT_LOTTERIES_SUCCESS';
export const GET_HOT_LOTTERIES_FAILURE = 'GET_HOT_LOTTERIES_FAILURE';

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
