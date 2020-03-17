import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
import { images } from '../../../assets/images';
import { responsiveSize } from '../../../utils/utils';
import { Localization } from '../../../utils/localization';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.small,
    paddingLeft: spacing.medium,
  },
  imageContainer: {
    height: responsiveSize(80),
    width: responsiveSize(80),
    borderColor: UIColors.navigationBar,
    borderWidth: 1,
  },
  userProfile: {
    height: responsiveSize(80),
    width: responsiveSize(80),
    resizeMode: 'contain',
  },
  subHeaderView: {
    flex: 1,
    paddingLeft: spacing.small,
    // backgroundColor: 'pink',
  },
  headingTxt: {
    color: UIColors.textTitle,
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProRegular,
  },
  buttonContainer: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    // justifyContent: 'space-around',
    marginTop: spacing.extraSmall,
  },
  editBtn: {
    flex: 1,
    paddingHorizontal: spacing.borderDouble,
    backgroundColor: UIColors.navigationBar,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.extraExtraSmall,
  },
  changeBtn: {
    // flex: 1.5,
    paddingHorizontal: spacing.extraSmall,
    backgroundColor: UIColors.navigationBar,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: spacing.extraSmall,
    paddingVertical: spacing.extraSmall,
  },
  inviteBtn: {
    // flex: 1,
    paddingHorizontal: spacing.extraSmall,
    backgroundColor: UIColors.purpleButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.small,
    paddingVertical: spacing.extraSmall,
  },
  btnTxt: {
    color: UIColors.appBackGroundColor,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
    // backgroundColor: 'red',
  },
});

const HeaderContainer = (props) => (
  <View style={styles.headerContainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.userProfile}
        source={images.profileIcon}
      />
    </View>
    <View style={styles.subHeaderView}>
      <Text style={styles.headingTxt}>User Profile</Text>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.btnTxt}>Edit Image</Text>
      </TouchableOpacity> */}
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.btnTxt}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inviteBtn}>
          <Text style={styles.btnTxt}>Invite Friend</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

HeaderContainer.propTypes = {
};

HeaderContainer.defaultProps = {

};

export default HeaderContainer;
