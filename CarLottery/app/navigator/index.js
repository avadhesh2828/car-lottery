import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from '../utils/constant';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import MyTicket from '../screens/MyTicket';
import MyTicketDetail from '../screens/MyTicketDetail';
import UserProfile from '../screens/UserProfile';
import SaferGambling from '../screens/SaferGambling';
import TabNavigator from './TabNavigator';
import Lobby from '../screens/Lobby';
import TabLoginNavigator from './TabLoginNavigator';

// const BeforeLoginTabNavigator = createStackNavigator(
//   {
//     Login: {
//       screen: Login,
//       key: screenNames.LOGIN_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     Signup: {
//       screen: Signup,
//       key: screenNames.SIGNUP_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     Lobby: {
//       screen: Lobby,
//       key: screenNames.LOBBY_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     Home: {
//       screen: Home,
//       key: screenNames.HOME_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     TabNavigator: {
//       screen: TabNavigator,
//       key: screenNames.TAB_NAVIGATOR,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     // TabLoginNavigator: {
//     //   screen: TabLoginNavigator,
//     //   key: screenNames.TAB_LOGIN_NAVIGATOR,
//     //   navigationOptions: {
//     //     header: null,
//     //   },
//     // },
//   },
//   {
//     initialRouteName: screenNames.TAB_NAVIGATOR,
//     headerMode: 'none',
//   },
// );

// const AfterLoginTabNavigator = createStackNavigator(
//   {
//     Lobby: {
//       screen: Lobby,
//       key: screenNames.LOBBY_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     Home: {
//       screen: Home,
//       key: screenNames.HOME_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     MyTicketDetails: {
//       screen: MyTicketDetail,
//       key: screenNames.MY_TICKET_DETAIL_SCREEN,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     UserProfile: {
//       screen: UserProfile,
//       key: screenNames.USER_PROFILE,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false,
//       },
//     },
//     TabLoginNavigator: {
//       screen: TabLoginNavigator,
//       key: screenNames.TAB_LOGIN_NAVIGATOR,
//       navigationOptions: {
//         header: null,
//       },
//     },
//   },
//   {
//     initialRouteName: screenNames.TAB_LOGIN_NAVIGATOR,
//     headerMode: 'none',
//   },
// );


const MainNavigator = createStackNavigator(
  {
    // BeforeLoginTabNavigator: {
    //   screen: BeforeLoginTabNavigator,
    // },
    // AfterLoginTabNavigator: {
    //   screen: AfterLoginTabNavigator,
    // },
    Splash: {
      screen: Splash,
      key: screenNames.SPLASH_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Login: {
      screen: Login,
      key: screenNames.LOGIN_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Signup: {
      screen: Signup,
      key: screenNames.SIGNUP_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Lobby: {
      screen: Lobby,
      key: screenNames.LOBBY_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Home: {
      screen: Home,
      key: screenNames.HOME_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    MyTicketDetails: {
      screen: MyTicketDetail,
      key: screenNames.MY_TICKET_DETAIL_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    MyTicket: {
      screen: MyTicket,
      key: screenNames.MY_TICKET_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    UserProfile: {
      screen: UserProfile,
      key: screenNames.USER_PROFILE,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    SaferGambling: {
      screen: SaferGambling,
      key: screenNames.SAFER_GAMBLING,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    TabNavigator: {
      screen: TabNavigator,
      key: screenNames.TAB_NAVIGATOR,
      navigationOptions: {
        header: null,
      },
    },
    TabLoginNavigator: {
      screen: TabLoginNavigator,
      key: screenNames.TAB_LOGIN_NAVIGATOR,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: screenNames.SPLASH_SCREEN,
    headerMode: 'none',
  },
);
const RootNavigator = createAppContainer(MainNavigator);

export default RootNavigator;
