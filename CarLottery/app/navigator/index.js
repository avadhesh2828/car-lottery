import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from '../utils/constant';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import MyTicketDetail from '../screens/MyTicketDetail';
import UserProfile from '../screens/UserProfile';

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
    MyTicketDetail: {
      screen: MyTicketDetail,
      key: screenNames.MY_TICKET_DETAIL_SCREEN,
    },
    UserProfile: {
      screen: UserProfile,
      key: screenNames.USER_PROFILE,
    },
  },
  {
    initialRouteName: screenNames.SPLASH_SCREEN,
    headerMode: 'none',
  },
);
const RootNavigator = createAppContainer(MainNavigator);

export default RootNavigator;
