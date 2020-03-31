import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
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
import { images } from '../assets/images';

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: isIOS ? responsiveSize(90) : responsiveSize(44),
    backgroundColor: UIColors.navigationBar,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: UIColors.appBackGroundColor,
    borderBottomColor: UIColors.appBackGroundColor,
    borderTopWidth: 1,
    borderTopColor: UIColors.appBackGroundColor,
  },
  userName: {
    fontSize: fontSizes.small,
    color: UIColors.appBackGroundColor,
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
  carlogo: {
    width: '40%',
    height: '20%',
  },
  copyrightText: {
    fontSize: fontSizes.small,
    color: UIColors.appBackGroundColor,
    marginVertical: spacing.semiMedium,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  copyrightContainer: {
    justifyContent: 'center',
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    alignItems: 'center',
  },
});

const SideMenu = (props) => {
  const { logoutAction, balance, userName } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.AboutUs}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.HowToPlay}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.Help}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.GameRules}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.FAQs}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.TermsContions}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subcontainer}>
        <Text style={styles.userName}>{Localization.SideMenu.PrivacyPolicy}</Text>
      </TouchableOpacity>
      <View style={ styles.copyrightContainer}>
        <Image source={images.carlogo} style={styles.carlogo} resizeMode={'cover'} />
        <Text style={styles.copyrightText}>{Localization.SideMenu.Copyright}</Text>
      </View>
    </View>
  );
};

SideMenu.propTypes = {
};

SideMenu.defaultProps = {
};

export default SideMenu;
