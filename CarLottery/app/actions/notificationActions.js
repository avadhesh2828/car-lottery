export const GET_ALL_NOTIFICATIONS_REQUEST = 'GET_ALL_NOTIFICATIONS_REQUEST';
export const GET_ALL_NOTIFICATIONS_SUCCESS = 'GET_ALL_NOTIFICATIONS_SUCCESS';
export const GET_ALL_NOTIFICATIONS_FAILURE = 'GET_ALL_NOTIFICATIONS_FAILURE';

export const USER_UNREAD_NOTIFICATION_REQUEST = 'USER_UNREAD_NOTIFICATION_REQUEST';
export const USER_UNREAD_NOTIFICATION_SUCCESS = 'USER_UNREAD_NOTIFICATION_SUCCESS';
export const USER_UNREAD_NOTIFICATION_FAILURE = 'USER_UNREAD_NOTIFICATION_FAILURE';

export const getAllNotificationsRequest = (data) => ({
  type: GET_ALL_NOTIFICATIONS_REQUEST,
  data,
});

export const getAllNotificationsSuccess = (data) => ({
  type: GET_ALL_NOTIFICATIONS_SUCCESS,
  data,
});

export const getAllNotificationsFailure = () => ({
  type: GET_ALL_NOTIFICATIONS_FAILURE,
});

export const userUnreadNotificationRequest = (data) => ({
  type: USER_UNREAD_NOTIFICATION_REQUEST,
  data,
});

export const userUnreadNotificationSuccess = (data) => ({
  type: USER_UNREAD_NOTIFICATION_SUCCESS,
  data,
});

export const userUnreadNotificationFailure = () => ({
  type: USER_UNREAD_NOTIFICATION_FAILURE,
});
