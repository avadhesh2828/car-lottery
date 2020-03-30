/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import DepositLimitContainer from './components/DepositLimitContainer';
import WagerLimitContainer from './components/WagerLimitContainer';
import TimeoutContainer from './components/TimeoutContainer';
import SelfExclusionContainer from './components/SelfExclusionContainer';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import HeaderAd from '../../components/HeaderAd';
import { responsiveSize } from '../../utils/utils';
import SideMenu from '../../components/SideMenu';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: UIColors.navigationBar,
    flex: 1,
  },
  subContainer: {
    backgroundColor: UIColors.appBackGroundColor,
    flex: 1,
  },
  tabbarHeader: {
    height: itemSizes.searchHeader,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.semiMedium,
    marginBottom: spacing.semiMedium,
    // backgroundColor: UIColors.purpleButtonColor,
  },
  tabContainer: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  label: {
    fontSize: 6,
    backgroundColor: 'orange',
    color: 'blue',
  },
});

const FirstRoute = () => (
  <DepositLimitContainer />
);

const SecondRoute = () => (
  <WagerLimitContainer />
);

const ThirdRoute = () => (
  <TimeoutContainer />
);

const FourthRoute = () => (
  <SelfExclusionContainer />
);

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'yellow' }}
    style={{ backgroundColor: UIColors.purpleButtonColor }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: focused ? 'yellow' : UIColors.whiteTxt, margin: 1, fontSize: responsiveSize(12) }}>
        {route.title}
      </Text>
    )}
  />
);

class SaferGambling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabIndex: 0,
      isPopupVisible: false,
      isSideMenuVisible: false,
      // eslint-disable-next-line react/no-unused-state
      index: 0,
      // eslint-disable-next-line react/no-unused-state
      routes: [
        { key: 'first', title: 'Deposit Limit' },
        { key: 'second', title: 'Wager Limit' },
        { key: 'third', title: 'Timeout' },
        { key: 'fourth', title: 'Self-exclusion' },
      ],
    };
  }

  componentDidMount() {
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }


  render() {
    // const {} = this.state;
    const { saferGambling, dashboard } = this.props;
    const { isPopupVisible, isSideMenuVisible } = this.state;
    // const {} = saferGambling;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          showBackButton
          showRightImageIcon
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
          showRightSideMenuImageIcon
          onPressSideMenuRightIcon={() => this.setState({ isSideMenuVisible: !isSideMenuVisible })}
        />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <HeaderAd adData={dashboard.headerAd} />
          <TabView
            renderTabBar={renderTabBar}
            navigationState={this.state}
            scrollEnabled
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
              third: ThirdRoute,
              fourth: FourthRoute,
            })}
            onIndexChange={(index) => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
          />
          <View style={{ flex: 1, marginTop: spacing.small }}>
            <HeaderAd adData={dashboard.footerAd} />
          </View>
        </KeyboardAwareScrollView>
        {
      UserData.SessionKey && isPopupVisible
        ? (
          <PopUpScreen
            balance={this.props.profileResponse.balance}
            userName={this.props.profileResponse.user_name}
            logoutAction={() => this.props.logoutRequest()}
          />
        )
        : null
  }
        {
       isSideMenuVisible
         ? <SideMenu />
         : null
     }
      </SafeAreaView>
    );
  }
}

SaferGambling.propTypes = {
  logoutRequest: PropTypes.func,
  dashboard: PropTypes.object,
  saferGambling: PropTypes.object,
};

SaferGambling.defaultProps = {
  logoutRequest: () => {},
  dashboard: {},
  saferGambling: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  saferGambling: state.SaferGamblingReducer,
  profileResponse: state.getProfileDataReducer.profileResponse,
});

const mapDispatchToProps = () => UserActions;

const saferGamblingScreen = connect(mapStateToProps, mapDispatchToProps)(SaferGambling);

export default saferGamblingScreen;
