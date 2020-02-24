import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../../screens/Login';

const LoginTabNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      key: 'login',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default LoginTabNavigator;
