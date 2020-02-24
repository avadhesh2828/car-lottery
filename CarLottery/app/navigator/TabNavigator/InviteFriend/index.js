import { createStackNavigator } from 'react-navigation-stack';

import InviteFriend from '../../../screens/InviteFriend';

const InviteFriendTabNavigator = createStackNavigator(
  {
    InviteFriend: {
      screen: InviteFriend,
      key: 'InviteFriend',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'InviteFriend',
  },
);
export default InviteFriendTabNavigator;
