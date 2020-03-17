/* eslint-disable react/prop-types */
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
} from 'react-native';
import MyTicket from './MyTicket';
// import InviteFriend from './InviteFriend';
import Home from './HomeTabNavigator';
import Lobby from './LobbyTabNavigator';
import MyFinance from './MyFinTabNavigator';
import User from './UserTabNavigator';
import { images } from '../../assets/images';
import {
  UIColors, itemSizes, spacing, fontName, fontSizes,
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
  titleStyle: {
    fontSize: fontSizes.tiny,
    color: UIColors.whiteTxt,
    fontFamily: fontName.sourceSansProRegular,
    paddingBottom: spacing.extraExtraSmall,
    // fontSize: fontSizes.medium,
  },
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
  tabbarContainer: {
    backgroundColor: UIColors.navigationBar,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabelContainer: {
    width: '100%',
    backgroundColor: UIColors.navigationBar,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      key: 'Home',
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <View style={[styles.tabLabelContainer, { backgroundColor: focused ? UIColors.navigationBar : 'transparent' }]}>
            <Text style={styles.titleStyle}>Home</Text>
          </View>
        ),
        tabBarIcon: ({ focused }) => (
          focused
            ? <View style={styles.tabbarContainer}><Image style={styles.tabIcon} source={images.home} /></View>
            : <Image style={styles.tabIcon} source={images.home} />
        ),
      },
    },
    User: {
      screen: User,
      key: 'User',
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <View style={[styles.tabLabelContainer, { backgroundColor: focused ? UIColors.navigationBar : 'transparent' }]}>
            <Text style={styles.titleStyle}>User</Text>
          </View>
        ),
        tabBarIcon: ({ focused }) => (
          focused
            ? <View style={styles.tabbarContainer}><Image style={styles.tabIcon} source={images.user} /></View>
            : <Image style={styles.tabIcon} source={images.user} />
        ),
      },
    },
    Lobby: {
      screen: Lobby,
      key: 'Lobby',
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <View style={[styles.tabLabelContainer, { backgroundColor: focused ? UIColors.navigationBar : 'transparent' }]}>
            <Text style={styles.titleStyle}>Lobby</Text>
          </View>
        ),
        tabBarIcon: ({ focused }) => (
          focused
            ? <View style={styles.tabbarContainer}><Image style={styles.tabIcon} source={images.lobby} /></View>
            : <Image style={styles.tabIcon} source={images.lobby} />
        ),
      },
    },
    MyTicket: {
      screen: MyTicket,
      key: 'MyTicket ',
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <View style={[styles.tabLabelContainer, { backgroundColor: focused ? UIColors.navigationBar : 'transparent' }]}>
            <Text style={styles.titleStyle}>MyTicket</Text>
          </View>
        ),
        tabBarIcon: ({ focused }) => (
          focused
            ? <View style={styles.tabbarContainer}><Image style={styles.tabIcon} source={images.myTicket} /></View>
            : <Image style={styles.tabIcon} source={images.myTicket} />
        ),
      },
    },
    MyFinance: {
      screen: MyFinance,
      key: 'MyFinance',
      navigationOptions: {
        header: null,
        tabBarLabel: ({ focused }) => (
          <View style={[styles.tabLabelContainer, { backgroundColor: focused ? UIColors.navigationBar : 'transparent' }]}>
            <Text style={styles.titleStyle}>MyFinance</Text>
          </View>
        ),
        tabBarIcon: ({ focused }) => (
          focused
            ? <View style={styles.tabbarContainer}><Image style={styles.tabIcon} source={images.finance} /></View>
            : <Image style={styles.tabIcon} source={images.finance} />
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
