import {
  GET_STATE_REQUEST,
  GET_STATE_SUCCESS,
  GET_STATE_FAILURE,
} from '../actions/profileActions';

const initialState = {
  isLoading: false,
  statesResponse: [{value: 'Select State'}],
};

function createStatesList(data) {
  const states = data.Data.state;
  const statesResponse = [];
  states.forEach((element) => {
    statesResponse.push({ value: element.name, data: element });
  });
  return statesResponse;
}

function getStatesReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_STATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        statesResponse: {},
      };
    case GET_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statesResponse: createStatesList(action.data),
      };
    case GET_STATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        statesResponse: action.data,
      };

    default:
      return state;
  }
}

export default getStatesReducer;
