import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE
} from '../actions/profileActions';

const initialState = {
  getTransactionsResponse: {},
  isLoading: false,
};

function getTransactionsReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        getTransactionsResponse: {},
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getTransactionsResponse: action.data,
      };
    case GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        getTransactionsResponse: {},
      };

    default:
      return state;
  }
}

export default getTransactionsReducer;
