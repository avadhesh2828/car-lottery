import {
  GET_ALL_NOTIFICATIONS_REQUEST,
  GET_ALL_NOTIFICATIONS_FAILURE,
  GET_ALL_NOTIFICATIONS_SUCCESS,
  USER_UNREAD_NOTIFICATION_REQUEST,
  USER_UNREAD_NOTIFICATION_FAILURE,
  USER_UNREAD_NOTIFICATION_SUCCESS,
} from '../actions/notificationActions';

const initialState = {
  notificationList: [],
  myNotificationsTotalPages: 1,
  isLoadingNotifications: false,
  currentNotificationPage: 1,
};

function notificationReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case USER_UNREAD_NOTIFICATION_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        unreadNotificationResponse: action.data.Data,
      };
    case USER_UNREAD_NOTIFICATION_FAILURE:
      return {
        ...state,
      };
    case GET_ALL_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isLoadingNotifications: true,
      };
    case GET_ALL_NOTIFICATIONS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const myNotificationList = action.data.response.Data.Notifications;
      // eslint-disable-next-line no-case-declarations
      const mylist = action.data.current_page === 1 ? myNotificationList : [...state.notificationList, ...myNotificationList];
      return {
        ...state,
        notificationList: mylist,
        myNotificationsTotalPages: Math.ceil((action.data.response.Data.total) / action.data.items_perpage),
        isLoadingNotifications: false,
        currentNotificationPage: action.data.current_page,
      };
    case GET_ALL_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        // notificationList: [],
        isLoadingNotifications: false,
      };
    default:
      return state;
  }
}

export default notificationReducer;
