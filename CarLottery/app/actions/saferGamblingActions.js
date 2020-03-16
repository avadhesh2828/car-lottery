export const GET_DEPOSIT_LIMIT_MONTHS_REQUEST = 'GET_DEPOSIT_LIMIT_MONTHS_REQUEST';
export const GET_DEPOSIT_LIMIT_MONTHS_FAILURE = 'GET_DEPOSIT_LIMIT_MONTHS_FAILURE';
export const GET_DEPOSIT_LIMIT_MONTHS_SUCCESS = 'GET_DEPOSIT_LIMIT_MONTHS_SUCCESS';

export const GET_DEPOSIT_LIMIT_WEEKS_REQUEST = 'GET_DEPOSIT_LIMIT_WEEKS_REQUEST';
export const GET_DEPOSIT_LIMIT_WEEKS_FAILURE = 'GET_DEPOSIT_LIMIT_WEEKS_FAILURE';
export const GET_DEPOSIT_LIMIT_WEEKS_SUCCESS = 'GET_DEPOSIT_LIMIT_WEEKS_SUCCESS';

export const GET_DEPOSIT_LIMIT_DAYS_REQUEST = 'GET_DEPOSIT_LIMIT_DAYS_REQUEST';
export const GET_DEPOSIT_LIMIT_DAYS_FAILURE = 'GET_DEPOSIT_LIMIT_DAYS_FAILURE';
export const GET_DEPOSIT_LIMIT_DAYS_SUCCESS = 'GET_DEPOSIT_LIMIT_DAYS_SUCCESS';

export const SET_DEPOSIT_LIMIT_MONTHS_REQUEST = 'SET_DEPOSIT_LIMIT_MONTHS_REQUEST';
export const SET_DEPOSIT_LIMIT_MONTHS_FAILURE = 'SET_DEPOSIT_LIMIT_MONTHS_FAILURE';
export const SET_DEPOSIT_LIMIT_MONTHS_SUCCESS = 'SET_DEPOSIT_LIMIT_MONTHS_SUCCESS';

export const SET_DEPOSIT_LIMIT_WEEKS_REQUEST = 'SET_DEPOSIT_LIMIT_WEEKS_REQUEST';
export const SET_DEPOSIT_LIMIT_WEEKS_FAILURE = 'SET_DEPOSIT_LIMIT_WEEKS_FAILURE';
export const SET_DEPOSIT_LIMIT_WEEKS_SUCCESS = 'SET_DEPOSIT_LIMIT_WEEKS_SUCCESS';

export const SET_DEPOSIT_LIMIT_DAYS_REQUEST = 'SET_DEPOSIT_LIMIT_DAYS_REQUEST';
export const SET_DEPOSIT_LIMIT_DAYS_FAILURE = 'SET_DEPOSIT_LIMIT_DAYS_FAILURE';
export const SET_DEPOSIT_LIMIT_DAYS_SUCCESS = 'SET_DEPOSIT_LIMIT_DAYS_SUCCESS';

export const GET_WAGER_LIMIT_MONTHS_REQUEST = 'GET_WAGER_LIMIT_MONTHS_REQUEST';
export const GET_WAGER_LIMIT_MONTHS_FAILURE = 'GET_WAGER_LIMIT_MONTHS_FAILURE';
export const GET_WAGER_LIMIT_MONTHS_SUCCESS = 'GET_WAGER_LIMIT_MONTHS_SUCCESS';

export const GET_WAGER_LIMIT_WEEKS_REQUEST = 'GET_WAGER_LIMIT_WEEKS_REQUEST';
export const GET_WAGER_LIMIT_WEEKS_FAILURE = 'GET_WAGER_LIMIT_WEEKS_FAILURE';
export const GET_WAGER_LIMIT_WEEKS_SUCCESS = 'GET_WAGER_LIMIT_WEEKS_SUCCESS';

export const GET_WAGER_LIMIT_DAYS_REQUEST = 'GET_WAGER_LIMIT_DAYS_REQUEST';
export const GET_WAGER_LIMIT_DAYS_FAILURE = 'GET_WAGER_LIMIT_DAYS_FAILURE';
export const GET_WAGER_LIMIT_DAYS_SUCCESS = 'GET_WAGER_LIMIT_DAYS_SUCCESS';

export const SET_WAGER_LIMIT_MONTHS_REQUEST = 'SET_WAGER_LIMIT_MONTHS_REQUEST';
export const SET_WAGER_LIMIT_MONTHS_FAILURE = 'SET_WAGER_LIMIT_MONTHS_FAILURE';
export const SET_WAGER_LIMIT_MONTHS_SUCCESS = 'SET_WAGER_LIMIT_MONTHS_SUCCESS';

export const SET_WAGER_LIMIT_WEEKS_REQUEST = 'SET_WAGER_LIMIT_WEEKS_REQUEST';
export const SET_WAGER_LIMIT_WEEKS_FAILURE = 'SET_WAGER_LIMIT_WEEKS_FAILURE';
export const SET_WAGER_LIMIT_WEEKS_SUCCESS = 'SET_WAGER_LIMIT_WEEKS_SUCCESS';

export const SET_WAGER_LIMIT_DAYS_REQUEST = 'SET_WAGER_LIMIT_DAYS_REQUEST';
export const SET_WAGER_LIMIT_DAYS_FAILURE = 'SET_WAGER_LIMIT_DAYS_FAILURE';
export const SET_WAGER_LIMIT_DAYS_SUCCESS = 'SET_WAGER_LIMIT_DAYS_SUCCESS';

export const DELETE_DEPOSIT_LIMIT_REQUEST = 'DELETE_DEPOSIT_LIMIT_REQUEST';
export const DELETE_DEPOSIT_LIMIT_FAILURE = 'DELETE_DEPOSIT_LIMIT_FAILURE';
export const DELETE_DEPOSIT_LIMIT_SUCCESS = 'DELETE_DEPOSIT_LIMIT_SUCCESS';

export const DELETE_WAGER_LIMIT_REQUEST = 'DELETE_WAGER_LIMIT_REQUEST';
export const DELETE_WAGER_LIMIT_FAILURE = 'DELETE_WAGER_LIMIT_FAILURE';
export const DELETE_WAGER_LIMIT_SUCCESS = 'DELETE_WAGER_LIMIT_SUCCESS';

export const SELF_TIMEOUT_REQUEST = 'SELF_TIMEOUT_REQUEST';
export const SELF_TIMEOUT_FAILURE = 'SELF_TIMEOUT_FAILURE';
export const SELF_TIMEOUT_SUCCESS = 'SELF_TIMEOUT_SUCCESS';

export const SUSPEND_USER_REQUEST = 'SUSPEND_USER_REQUEST';
export const SUSPEND_USER_FAILURE = 'SUSPEND_USER_FAILURE';
export const SUSPEND_USER_SUCCESS = 'SUSPEND_USER_SUCCESS';

// SUSPEND USER
export const suspendUserRequest = (data) => ({
  type: SUSPEND_USER_REQUEST,
  data,
});

export const suspendUserSuccess = (data) => ({
  type: SUSPEND_USER_SUCCESS,
  data,
});

export const suspendUserFailure = () => ({
  type: SUSPEND_USER_FAILURE,
});


// Timeout
export const selfTimeoutRequest = (data) => ({
  type: SELF_TIMEOUT_REQUEST,
  data,
});

export const selfTimeoutSuccess = (data) => ({
  type: SELF_TIMEOUT_SUCCESS,
  data,
});

export const selfTimeoutFailure = () => ({
  type: SELF_TIMEOUT_FAILURE,
});

// Deposit limit
export const deleteDepositLimitRequest = (data) => ({
  type: DELETE_DEPOSIT_LIMIT_REQUEST,
  data,
});

export const deleteDepositLimitSuccess = (data) => ({
  type: DELETE_DEPOSIT_LIMIT_SUCCESS,
  data,
});

export const deleteDepositLimitFailure = () => ({
  type: DELETE_DEPOSIT_LIMIT_FAILURE,
});

export const deleteWagerLimitRequest = (data) => ({
  type: DELETE_WAGER_LIMIT_REQUEST,
  data,
});

export const deleteWagerLimitSuccess = (data) => ({
  type: DELETE_WAGER_LIMIT_SUCCESS,
  data,
});

export const deleteWagerLimitFailure = (data) => ({
  type: DELETE_WAGER_LIMIT_FAILURE,
  data,
});

export const getDepositLimitMonthsRequest = (data) => ({
  type: GET_DEPOSIT_LIMIT_MONTHS_REQUEST,
  data,
});

export const getDepositLimitMonthsSuccess = (data) => ({
  type: GET_DEPOSIT_LIMIT_MONTHS_SUCCESS,
  data,
});

export const getDepositLimitMonthsFailure = () => ({
  type: GET_DEPOSIT_LIMIT_MONTHS_FAILURE,
});

// week
export const getDepositLimitWeeksRequest = (data) => ({
  type: GET_DEPOSIT_LIMIT_WEEKS_REQUEST,
  data,
});

export const getDepositLimitWeeksSuccess = (data) => ({
  type: GET_DEPOSIT_LIMIT_WEEKS_SUCCESS,
  data,
});

export const getDepositLimitWeeksFailure = () => ({
  type: GET_DEPOSIT_LIMIT_WEEKS_FAILURE,
});

// days

export const getDepositLimitDaysRequest = (data) => ({
  type: GET_DEPOSIT_LIMIT_DAYS_REQUEST,
  data,
});

export const getDepositLimitDaysSuccess = (data) => ({
  type: GET_DEPOSIT_LIMIT_DAYS_SUCCESS,
  data,
});

export const getDepositLimitDaysFailure = () => ({
  type: GET_DEPOSIT_LIMIT_DAYS_FAILURE,
});


export const setDepositLimitMonthsRequest = (data) => ({
  type: SET_DEPOSIT_LIMIT_MONTHS_REQUEST,
  data,
});

export const setDepositLimitMonthsSuccess = (data) => ({
  type: SET_DEPOSIT_LIMIT_MONTHS_SUCCESS,
  data,
});

export const setDepositLimitMonthsFailure = () => ({
  type: SET_DEPOSIT_LIMIT_MONTHS_FAILURE,
});

export const setDepositLimitWeeksRequest = (data) => ({
  type: SET_DEPOSIT_LIMIT_WEEKS_REQUEST,
  data,
});

export const setDepositLimitWeeksSuccess = (data) => ({
  type: SET_DEPOSIT_LIMIT_WEEKS_SUCCESS,
  data,
});

export const setDepositLimitWeeksFailure = () => ({
  type: SET_DEPOSIT_LIMIT_WEEKS_FAILURE,
});

export const setDepositLimitDaysRequest = (data) => ({
  type: SET_DEPOSIT_LIMIT_DAYS_REQUEST,
  data,
});

export const setDepositLimitDaysSuccess = (data) => ({
  type: SET_DEPOSIT_LIMIT_DAYS_SUCCESS,
  data,
});

export const setDepositLimitDaysFailure = () => ({
  type: SET_DEPOSIT_LIMIT_DAYS_FAILURE,
});


// Wager limit
export const getWagerLimitMonthsRequest = (data) => ({
  type: GET_WAGER_LIMIT_MONTHS_REQUEST,
  data,
});

export const getWagerLimitMonthsSuccess = (data) => ({
  type: GET_WAGER_LIMIT_MONTHS_SUCCESS,
  data,
});

export const getWagerLimitMonthsFailure = () => ({
  type: GET_WAGER_LIMIT_MONTHS_FAILURE,
});

export const getWagerLimitWeeksRequest = (data) => ({
  type: GET_WAGER_LIMIT_WEEKS_REQUEST,
  data,
});

export const getWagerLimitWeeksSuccess = (data) => ({
  type: GET_WAGER_LIMIT_WEEKS_SUCCESS,
  data,
});

export const getWagerLimitWeeksFailure = () => ({
  type: GET_WAGER_LIMIT_WEEKS_FAILURE,
});

export const getWagerLimitDaysRequest = (data) => ({
  type: GET_WAGER_LIMIT_DAYS_REQUEST,
  data,
});

export const getWagerLimitDaysSuccess = (data) => ({
  type: GET_WAGER_LIMIT_DAYS_SUCCESS,
  data,
});

export const getWagerLimitDaysFailure = () => ({
  type: GET_WAGER_LIMIT_DAYS_FAILURE,
});
// export const getWagerLimitRequest = (data) => ({
//   type: GET_WAGER_LIMIT_REQUEST,
//   data,
// });

// export const getWagerLimitSuccess = (data) => ({
//   type: GET_WAGER_LIMIT_SUCCESS,
//   data,
// });

// export const getWagerLimitFailure = () => ({
//   type: GET_WAGER_LIMIT_FAILURE,
// });

// export const setWagerLimitRequest = (data) => ({
//   type: SET_WAGER_LIMIT_REQUEST,
//   data,
// });

// export const setWagerLimitSuccess = (data) => ({
//   type: SET_WAGER_LIMIT_SUCCESS,
//   data,
// });

// export const setWagerLimitFailure = () => ({
//   type: SET_WAGER_LIMIT_FAILURE,
// });

export const setWagerLimitMonthsRequest = (data) => ({
  type: SET_WAGER_LIMIT_MONTHS_REQUEST,
  data,
});

export const setWagerLimitMonthsSuccess = (data) => ({
  type: SET_WAGER_LIMIT_MONTHS_SUCCESS,
  data,
});

export const setWagerLimitMonthsFailure = () => ({
  type: SET_WAGER_LIMIT_MONTHS_FAILURE,
});

export const setWagerLimitWeeksRequest = (data) => ({
  type: SET_WAGER_LIMIT_WEEKS_REQUEST,
  data,
});

export const setWagerLimitWeeksSuccess = (data) => ({
  type: SET_WAGER_LIMIT_WEEKS_SUCCESS,
  data,
});

export const setWagerLimitWeeksFailure = () => ({
  type: SET_WAGER_LIMIT_WEEKS_FAILURE,
});

export const setWagerLimitDaysRequest = (data) => ({
  type: SET_WAGER_LIMIT_DAYS_REQUEST,
  data,
});

export const setWagerLimitDaysSuccess = (data) => ({
  type: SET_WAGER_LIMIT_DAYS_SUCCESS,
  data,
});

export const setWagerLimitDaysFailure = () => ({
  type: SET_WAGER_LIMIT_DAYS_FAILURE,
});
