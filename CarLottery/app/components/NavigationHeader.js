/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../assets/images';
import Navigation from '../utils/navigation';
import {
  spacing, itemSizes, UIColors, fontSizes, fontWeights,
} from '../utils/variables';
import { isIOS, isIphoneX, NavBarHeight } from '../utils/plateformSpecific';
import { responsiveSize } from '../utils/utils';
import PopUpScreen from './PopupScreen';
import { screenNames } from '../utils/constant';
import { UserData } from '../utils/global';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.navigationBar,
    paddingHorizontal: spacing.semiMedium,
    elevation: 5,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbutton: {
    position: 'absolute',
    top: isIOS ? responsiveSize(20) : responsiveSize(13),
    left: 0,
    marginLeft: spacing.small,
    width: responsiveSize(40),
    // height: responsiveSize(30),
  },
  userbutton: {
    position: 'absolute',
    top: isIOS ? responsiveSize(20) : responsiveSize(13),
    // backgroundColor: 'pink',
    right: 0,
    marginLeft: spacing.semiMedium,
    width: responsiveSize(40),
    // height: responsiveSize(30),
  },
  bellbutton: {
    position: 'absolute',
    top: isIOS ? responsiveSize(20) : responsiveSize(13),
    right: 0,
    marginRight: responsiveSize(30),
    width: responsiveSize(40),
    // height: responsiveSize(30),
  },
  userIcon: {
    tintColor: UIColors.appBackGroundColor,
    marginHorizontal: spacing.semiMedium,
    // backgroundColor: 'orange',
    width: itemSizes.iconMedium,
    height: itemSizes.iconSmall,
  },
  bellIcon: {
    tintColor: UIColors.appBackGroundColor,
    marginHorizontal: spacing.semiMedium,
    width: itemSizes.iconMedium,
    height: itemSizes.iconMedium,
  },
  backIcon: {
    tintColor: UIColors.appBackGroundColor,
    marginHorizontal: spacing.semiMedium,
    width: itemSizes.iconMedium,
    height: itemSizes.iconMedium,
  },
  title: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
  },
  emptyBox: {
    height: itemSizes.defaultHeight,
    width: itemSizes.defaultWidth,
  },
  logo: {
    width: responsiveSize(80),
    height: NavBarHeight,
  },
});

class NavigationHeader extends Component {
  onPressBack = () => { Navigation.sharedInstance().popScreen(); }

  onPressLogout() { /* TODO */ }

  onPressRightIcon = () => {
  }


  render() {
    const {
      showBackButton,
      title,
      logo,
      backgroundColor,
      showRightUserImageIcon,
      rightImageIcon,
      showRightBellImageIcon,
      onPressRightIcon,
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor, height: NavBarHeight }]}>
        <SafeAreaView style={styles.subContainer}>
          {
            showBackButton && (
              <TouchableOpacity style={styles.backbutton} onPress={this.onPressBack}>
                <Image source={images.backIcon} style={styles.backIcon} />
              </TouchableOpacity>
            )
          }
          {title != null && <Text style={styles.title}>{title}</Text>}
          {logo && <Image source={images.carlogo} style={styles.logo} />}
          {
            showRightBellImageIcon
              && (
                <TouchableOpacity
                  style={styles.bellbutton}
                  onPress={() => {
                    if (UserData.SessionKey) {
                      Navigation.sharedInstance().pushToScreen(screenNames.NOTIFICATION);
                    }
                  }}
                >
                  <Image source={images.bellIcon} style={styles.bellIcon} resizeMode={'contain'} />
                </TouchableOpacity>
              )
          }

          {
            showRightUserImageIcon
              && (
                <TouchableOpacity style={styles.userbutton} onPress={onPressRightIcon}>
                  <Image source={images.usernav} style={styles.userIcon} resizeMode={'contain'} />
                </TouchableOpacity>
              )
          }
        </SafeAreaView>
      </View>
    );
  }
}

NavigationHeader.propTypes = {
  showBackButton: PropTypes.bool,
  showRightImageIcon: PropTypes.bool,
  isShowLogoutButton: PropTypes.bool,
  title: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  rightImageIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  backgroundColor: PropTypes.string,
  onPressRightIcon: PropTypes.func,
};

NavigationHeader.defaultProps = {
  showBackButton: false,
  showRightImageIcon: false,
  isShowLogoutButton: false,
  title: null,
  logo: null,
  rightImageIcon: null,
  backgroundColor: UIColors.navigationBar,
  onPressRightIcon: () => {},
};

export default NavigationHeader;
