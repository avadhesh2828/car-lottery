/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import HeaderAd from '../../components/HeaderAd';
import { responsiveSize } from '../../utils/utils';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: UIColors.navigationBar,
    flex: 1,
  },
  subContainer: {
    backgroundColor: UIColors.appBackGroundColor,
    flex: 1,
  },
});


class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabIndex: 0,
      isPopupVisible: false,
    };
  }

  componentDidMount() {
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }


  render() {
    // const {} = this.state;
    const { notification, dashboard } = this.props;
    const { isPopupVisible } = this.state;
    // const {} = notification;
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
        <KeyboardAwareScrollView style={styles.subContainer}>
          <HeaderAd adData={dashboard.headerAd} />
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
      </SafeAreaView>
    );
  }
}

notification.propTypes = {
  logoutRequest: PropTypes.func,
  dashboard: PropTypes.object,
  notification: PropTypes.object,
  profileResponse: PropTypes.object,
};

notification.defaultProps = {
  logoutRequest: () => {},
  dashboard: {},
  notification: {},
  profileResponse: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  notification: state.notificationReducer,
  profileResponse: state.getProfileDataReducer.profileResponse,
});

const mapDispatchToProps = () => UserActions;

const notificationScreen = connect(mapStateToProps, mapDispatchToProps)(notification);

export default notificationScreen;
