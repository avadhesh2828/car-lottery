import {
  INVITE_FRIEND_FAILURE,
  INVITE_FRIEND_REQUEST,
  INVITE_FRIEND_SUCCESS,
  SEND_INVITATION_FAILURE,
  SEND_INVITATION_REQUEST,
  SEND_INVITATION_SUCCESS,
} from '../actions/profileActions';

const initialState = {
  isLoading: false,
  userInviteResponse: [],
  sendInvitationResponse: [],
  userInviteTotalPages: 1,
  currentuserInvitePage: 1,
};

function getInviteFriendReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case INVITE_FRIEND_REQUEST:
      return {
        ...state,
        isLoading: true,
        userInviteResponse: [],
      };
    case INVITE_FRIEND_SUCCESS:
      const FriendList = action.data.dataResponse.InviteFreind;
      const invitelist = action.data.currentPage === 1 ? FriendList : [...state.userInviteResponse, ...FriendList];
      return {
        ...state,
        userInviteResponse: invitelist,
        userInviteTotalPages: Math.ceil((action.data.dataResponse.total) / action.data.itemsPerPage),
        isLoading: false,
        currentuserInvitePage: action.data.currentPage,
      };
    case INVITE_FRIEND_FAILURE:
      return {
        ...state,
        isLoading: false,
        userInviteResponse: [],
      };
    case SEND_INVITATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        sendInvitationResponse: [],
      };
    case SEND_INVITATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendInvitationResponse: action.data.Data,
      };
    case SEND_INVITATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        sendInvitationResponse: [],
      };
    default:
      return state;
  }
}

export default getInviteFriendReducer;
