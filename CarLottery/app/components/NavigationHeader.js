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

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.navigationBar,
    paddingHorizontal: spacing.semiMedium,
    paddingVertical: spacing.extraSmall,
    elevation: 5,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backbutton: {
    width: itemSizes.defaultWidth,
    height: itemSizes.defaultHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userbutton: {
    marginLeft: spacing.semiMedium,
    marginRight: spacing.semiMedium,
    flexDirection: 'row-reverse',
    width: itemSizes.iconMedium,
    height: itemSizes.iconMedium,
  },
  userIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: itemSizes.iconMedium,
    height: itemSizes.iconMedium,
  },
  backIcon: {
    width: itemSizes.backIconWidth,
    height: itemSizes.backIconWidth,
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
    width: itemSizes.navLogoImageWidth,
    height: itemSizes.navLogoImageHeight,
  },
});

class NavigationHeader extends Component {
  onPressBack = () => { Navigation.sharedInstance().popScreen(); }

  onPressLogout() { /* TODO */ }

  render() {
    const {
      showBackButton,
      title,
      logo,
      backgroundColor,
      showRightImageIcon,
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
                {/* <Image source={images.back} style={styles.backIcon} /> */}
              </TouchableOpacity>
            )
          }
          {title != null && <Text style={styles.title}>{title}</Text>}
          {logo != null && <Image source={logo} style={styles.logo} />}
          {
            showRightBellImageIcon
              && (
                <TouchableOpacity style={styles.userbutton} onPress={onPressRightIcon}>
                  <Image source={images.bellIcon} style={styles.userIcon} />
                </TouchableOpacity>
              )
          }

          {
            showRightImageIcon
              && (
                <TouchableOpacity style={styles.userbutton} onPress={onPressRightIcon}>
                  <Image source={images.user} style={styles.userIcon} />
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
