import { createStackNavigator } from 'react-navigation-stack';

import MyTicket from '../../../screens/MyTicket';

const MyTicketTabNavigator = createStackNavigator(
  {
    MyTicket: {
      screen: MyTicket,
      key: 'MyTicket',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'MyTicket',
  },
);
export default MyTicketTabNavigator;
