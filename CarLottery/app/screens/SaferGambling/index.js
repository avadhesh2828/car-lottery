/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TabView, SceneMap } from 'react-native-tab-view';
import _ from 'lodash';
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


class SaferGambling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabIndex: 0,
      isPopupVisible: false,
      index: 0,
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

  _renderLabel = ({ route }) => (
    <Text style={styles.label}>{route.title}</Text>
  );

  render() {
    // const {} = this.state;
    const { saferGambling } = this.props;
    const { isPopupVisible } = this.state;
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
        />
        <View style={styles.subContainer}>
          <TabView
            renderLabel={() => this._renderLabel()}
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
        </View>
        {
      UserData.SessionKey && isPopupVisible
        ? (
          <PopUpScreen
            logoutAction={() => this.props.logoutRequest()}
          />
        )
        : null
  }
      </SafeAreaView>
    );
  }
}

SaferGambling.propTypes = {
  logoutRequest: PropTypes.func,
};

SaferGambling.defaultProps = {
  logoutRequest: () => {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  saferGambling: state.SaferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

const saferGamblingScreen = connect(mapStateToProps, mapDispatchToProps)(SaferGambling);

export default saferGamblingScreen;
