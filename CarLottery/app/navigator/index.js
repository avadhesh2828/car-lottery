import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from '../utils/constant';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

const MainNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      key: screenNames.SPLASH_SCREEN,
    },
    Login: {
      screen: Login,
      key: screenNames.LOGIN_SCREEN,
    },
    Signup: {
      screen: Signup,
      key: screenNames.SIGNUP_SCREEN,
    },
    Home: {
      screen: Home,
      key: screenNames.HOME_SCREEN,
    },
  },
  {
    initialRouteName: screenNames.SPLASH_SCREEN,
    headerMode: 'none',
  },
);
const RootNavigator = createAppContainer(MainNavigator);

export default RootNavigator;
