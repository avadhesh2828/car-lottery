/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fontSizes, fontWeights, itemSizes, UIColors, spacing, fontName,
} from '../utils/variables';
import { Localization } from '../utils/localization';
import { responsiveSize } from '../utils/utils';
import Navigation from '../utils/navigation';
import { screenNames } from '../utils/constant';
import { isIOS } from '../utils/plateformSpecific';

const styles = StyleSheet.create({
  container: {
    width: '35%',
    position: 'absolute',
    right: 0,
    top: isIOS ? responsiveSize(95) : responsiveSize(50),
    backgroundColor: UIColors.grayBackgroundColor,
    borderBottomLeftRadius: spacing.medium,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: UIColors.grayText,
  },
  userName: {
    fontSize: fontSizes.extraExtraSmall,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  subcontainer: {
    justifyContent: 'center',
    padding: spacing.small,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: UIColors.appBackGroundColor,
  },
  logoutcontainer: {
    justifyContent: 'center',
    padding: spacing.small,
    alignItems: 'center',
    borderColor: UIColors.appBackGroundColor,
  },
});

const PopUpScreen = (props) => {
  const { logoutAction } = props;
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.userName}>User Name</Text>
      </View>
      <View style={[styles.subcontainer, { flexDirection: 'row' }]}>
        <Text style={styles.userName}>Balance</Text>
        <Text style={[styles.userName, { marginLeft: spacing.semiMedium }]}>
          ₦ 212524
        </Text>
      </View>
      <TouchableOpacity style={styles.subcontainer} onPress={() => Navigation.sharedInstance().pushToScreen(screenNames.SAFER_GAMBLING)}>
        <Text style={styles.userName}>{Localization.NavigationHeader.SaferGambling}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutcontainer} onPress={() => logoutAction()}>
        <Text style={styles.userName}>{Localization.NavigationHeader.Logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

PopUpScreen.propTypes = {
};

PopUpScreen.defaultProps = {
};

export default PopUpScreen;
