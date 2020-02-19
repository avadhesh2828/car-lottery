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
  contestDetailContainer: {
    marginTop: spacing.small,
  },
  contestDetail: {
    flexDirection: 'row',
    marginHorizontal: spacing.medium,
  },
  nameView: {
    flex: 1,
  },
  titleTxt: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.grayText,
    fontFamily: fontName.sourceSansProRegular,
  },
  valueTxt: {
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: spacing.small,
    marginLeft: spacing.small,
    marginBottom: spacing.small,
  },
  SearchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginEnd: spacing.extraSmall,
  },
  searchIconStyle: {
    width: itemSizes.iconExtraSmall,
    height: itemSizes.iconExtraSmall,
    tintColor: UIColors.appBackGroundColor,
  },
  searchButton: {
    backgroundColor: UIColors.purpleButtonColor,
    height: responsiveSize(32),
    width: responsiveSize(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    height: responsiveSize(32),
    color: UIColors.textTitle,
    borderColor: UIColors.grayBackgroundColor,
    borderWidth: 1,
    paddingLeft: spacing.small,
  },
  prizeButton: {
    backgroundColor: UIColors.navigationBar,
    width: itemSizes.defaultWidth,
    justifyContent: 'center',
    marginLeft: spacing.small,
    marginRight: spacing.smallHalf,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: UIColors.purpleButtonColor,
    width: itemSizes.defaultWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.smallHalf,
    marginRight: spacing.small,
  },
  buyTxt: {
    color: UIColors.appBackGroundColor,
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
});

const HeaderContainer = (props) => (
  // <View style={{flex: 1, backgroundColor}}>
  <View style={styles.contestDetailContainer}>
    <View style={styles.contestDetail}>
      <View style={styles.nameView}>
        <Text style={styles.titleTxt}>Name</Text>
        <Text style={styles.valueTxt}>Win Audi R8</Text>
      </View>
      <View style={styles.nameView}>
        <Text style={styles.titleTxt}>Ticket Price</Text>
        <Text style={styles.valueTxt}>N 80</Text>
      </View>
      <View style={styles.nameView}>
        <Text style={styles.titleTxt}>Ticket Brought</Text>
        <Text style={styles.valueTxt}>50</Text>
      </View>
    </View>

    <View style={styles.subContainer}>
      <View style={styles.SearchContainer}>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.textInputStyle}
          placeholder={'Search by Lottery name'}
          placeholderTextColor={UIColors.grayText}
          onChangeText={props.onChangetext}
          clearButtonMode={'always'}
          value={props.searchValue}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Image style={styles.searchIconStyle} source={images.searchIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.prizeButton}>
        <Text style={styles.buyTxt}>Prizes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyTxt}>Buy</Text>
      </TouchableOpacity>
    </View>
  </View>
);

HeaderContainer.propTypes = {
};

HeaderContainer.defaultProps = {

};

export default HeaderContainer;
