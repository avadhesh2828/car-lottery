import { createStackNavigator } from 'react-navigation-stack';

import User from '../../../screens/UserProfile';

const UserTabNavigator = createStackNavigator(
  {
    User: {
      screen: User,
      key: 'User',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'User',
  },
);

export default UserTabNavigator;
