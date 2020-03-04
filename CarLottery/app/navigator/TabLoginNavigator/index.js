/* eslint-disable react/prop-types */
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import MyTicket from './MyTicket';
// import InviteFriend from './InviteFriend';
import Home from './HomeTabNavigator';
import Lobby from './LobbyTabNavigator';
import MyFinance from './MyFinTabNavigator';
import User from './UserTabNavigator';
import { images } from '../../assets/images';
import {
  UIColors, itemSizes, spacing,
} from '../../utils/variables';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: UIColors.purpleButtonColor,
  },
  // tabContainer: {
  //   padding: spacing.medium,
  //   marginTop: spacing.large,
  //   width: itemSizes.largeWidth,
  //   height: itemSizes.defaultHeight,
  //   backgroundColor: 'green',
  // },
  // titleStyle: {
  //   fontSize: fontSizes.tiny,
  //   width: width / 2,
  // },
  tabIcon: {
    width: itemSizes.iconExtraLarge,
    height: itemSizes.iconLarge,
    resizeMode: 'contain',
    tintColor: UIColors.appBackGroundColor,
  },
  tabBarStyle: {
    width: width / 2,
    height: itemSizes.defaultHeight,
    marginTop: spacing.smalls,
  },
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      key: 'Home',
      navigationOptions: {
        header: null,
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          focused
            ? <Image style={styles.tabIcon} source={images.home} />
            : <Image style={styles.tabIcon} source={images.home} />
        ),
      },
    },
    User: {
      screen: User,
      key: 'User',
      navigationOptions: {
        header: null,
        tabBarLabel: 'User',
        tabBarIcon: ({ focused }) => (
          focused
            ? <Image style={styles.tabIcon} source={images.user} />
            : <Image style={styles.tabIcon} source={images.user} />
        ),
      },
    },
    Lobby: {
      screen: Lobby,
      key: 'Lobby',
      navigationOptions: {
        header: null,
        tabBarLabel: 'Lobby',
        tabBarIcon: ({ focused }) => (
          focused
            ? <Image style={styles.tabIcon} source={images.lobby} />
            : <Image style={styles.tabIcon} source={images.lobby} />
        ),
      },
    },
    MyTicket: {
      screen: MyTicket,
      key: 'MyTicket ',
      navigationOptions: {
        header: null,
        tabBarLabel: 'MyTicket ',
        tabBarIcon: ({ focused }) => (
          focused
            ? <Image style={styles.tabIcon} source={images.myTicket} />
            : <Image style={styles.tabIcon} source={images.myTicket} />
        ),
      },
    },
    MyFinance: {
      screen: MyFinance,
      key: 'MyFinance',
      navigationOptions: {
        header: null,
        tabBarLabel: 'MyFinance',
        tabBarIcon: ({ focused }) => (
          focused
            ? <Image style={styles.tabIcon} source={images.help} />
            : <Image style={styles.tabIcon} source={images.help} />
        ),
      },
    },
    // InviteFriend: {
    //   screen: InviteFriend,
    //   key: 'InviteFriend',
    //   navigationOptions: {
    //     header: null,
    //     tabBarLabel: 'Invite',
    //     tabBarIcon: ({ focused }) => (
    //       focused
    //         ? <Image style={styles.tabIcon} source={images.MyTicket} />
    //         : <Image style={styles.tabIcon} source={images.MyTicket} />
    //     ),
    //   },
    // },
  },
  {
    tabBarOptions: {
      // activeTintColor: 'rgb(119, 191, 67)',
      // inactiveTintColor: 'rgb(44, 44, 44)',
      style: styles.tabStyle,
      allowFontScaling: true,
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      tabStyle: styles.tabBarStyle,
    },
    headerMode: 'none',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    scrollEnabled: true,
  },
);
