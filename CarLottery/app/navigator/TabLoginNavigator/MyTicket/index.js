import { createStackNavigator } from 'react-navigation-stack';

import MyTicketDetails from '../../../screens/MyTicketDetail';

const MyTicketDetailsTabNavigator = createStackNavigator(
  {
    MyTicketDetails: {
      screen: MyTicketDetails,
      key: 'MyTicketDetails',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'MyTicketDetails',
  },
);
export default MyTicketDetailsTabNavigator;
