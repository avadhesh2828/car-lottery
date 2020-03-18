export const GET_HEADER_AD_REQUEST = 'GET_HEADER_AD_REQUEST';
export const GET_HEADER_AD_SUCCESS = 'GET_HEADER_AD_SUCCESS';
export const GET_HEADER_AD_FAILURE = 'GET_HEADER_AD_FAILURE';

export const GET_FOOTER_AD_REQUEST = 'GET_FOOTER_AD_REQUEST';
export const GET_FOOTER_AD_SUCCESS = 'GET_FOOTER_AD_SUCCESS';
export const GET_FOOTER_AD_FAILURE = 'GET_FOOTER_AD_FAILURE';

export const getHeaderAdRequest = (data) => ({
  type: GET_HEADER_AD_REQUEST,
  data,
});

export const getHeaderAdSuccess = (data) => ({
  type: GET_HEADER_AD_SUCCESS,
  data,
});

export const getHeaderAdFailure = () => ({
  type: GET_HEADER_AD_FAILURE,
});

export const getFooterAdRequest = (data) => ({
  type: GET_FOOTER_AD_REQUEST,
  data,
});

export const getFooterAdSuccess = (data) => ({
  type: GET_FOOTER_AD_SUCCESS,
  data,
});

export const getFooterAdFailure = () => ({
  type: GET_FOOTER_AD_FAILURE,
});
