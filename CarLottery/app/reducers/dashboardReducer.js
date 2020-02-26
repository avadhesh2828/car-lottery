import {
  // common lottery
  GET_HOT_LOTTERIES_SUCCESS,
  GET_HOT_LOTTERIES_FAILURE,
} from '../actions/dashboardActions';

const initialState = {
  hotLotteries: [],
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

    default:
      return state;
  }
}

export default dashboardReducer;
