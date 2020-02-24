import { createStackNavigator } from 'react-navigation-stack';

import Home from '../../../screens/Home';

const HomeTabNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      key: 'Home',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default HomeTabNavigator;
