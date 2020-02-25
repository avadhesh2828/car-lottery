import { createStackNavigator } from 'react-navigation-stack';

import Lobby from '../../../screens/Lobby';

const LobbyTabNavigator = createStackNavigator(
  {
    Lobby: {
      screen: Lobby,
      key: 'Lobby',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Lobby',
  },
);

export default LobbyTabNavigator;
