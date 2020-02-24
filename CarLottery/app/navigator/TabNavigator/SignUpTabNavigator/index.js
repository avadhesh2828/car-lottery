import { createStackNavigator } from 'react-navigation-stack';

import Signup from '../../../screens/Signup';

const SignUpTabNavigator = createStackNavigator(
  {
    Signup: {
      screen: Signup,
      key: 'Signup',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Signup',
  },
);
export default SignUpTabNavigator;
