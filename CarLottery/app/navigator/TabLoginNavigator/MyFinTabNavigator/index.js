import { createStackNavigator } from 'react-navigation-stack';

import MyFinance from '../../../screens/Login';

const MyFinanceTabNavigator = createStackNavigator(
  {
    MyFinance: {
      screen: MyFinance,
      key: 'MyFinance ',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'MyFinance ',
  },
);

export default MyFinanceTabNavigator;
