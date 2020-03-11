import {
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from '../actions/profileActions';

const initialState = {
  isLoading: false,
  countryResponse: [],
};

function createCountryList(data) {
  const countries = data.Data.country;
  const countryResponse = [];
  countries.forEach((element) => {
    countryResponse.push({ value: element.name, data: element });
  });

  return countryResponse;
}

function getCountriesReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_COUNTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        countryResponse: {},
      };
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countryResponse: createCountryList(action.data),
      };
    case GET_COUNTRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        countryResponse: action.data,
      };

    default:
      return state;
  }
}

export default getCountriesReducer;
