/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
import { images } from '../../../assets/images';
// import { responsiveFontSize } from '../../../utils/utils_functions';
import { responsiveSize } from '../../../utils/utils';
import { Localization } from '../../../utils/localization';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: spacing.medium,
    borderColor: 'transparent',
    backgroundColor: UIColors.appBackGroundColor,
    width: (Dimensions.get('window').width - 10) / 2,
    margin: spacing.extraSmall,
  },
  imageContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: spacing.medium,
    borderTopRightRadius: spacing.medium,
    borderWidth: 1,
    width: '100%',
    height: responsiveSize(150),
    borderColor: 'transparent',
    backgroundColor: 'yellow',
  },
  lotteryFillPercent: {
    marginLeft: spacing.small,
    fontSize: fontSizes.extraSmall,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
  },
  lotteryImage: {
    height: responsiveSize(150),
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
  detailContainer: {
    flex: 1,
    borderRadius: spacing.medium,
    borderWidth: 1,
    borderColor: UIColors.appBackGroundColor,
    padding: spacing.small,
    alignItems: 'center',
  },
  lotteryTitle: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: spacing.small,
  },
  ticketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.tiny,
    includeFontPadding: false,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  playBtn: {
    backgroundColor: UIColors.purpleButtonColor,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.small,
  },
  openDetailBtn: {
    flex: 0.5,
    marginLeft: spacing.extraSmall,
    backgroundColor: UIColors.purpleButtonColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  txtStyle: {
    color: UIColors.appBackGroundColor,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
  },
});


const LotteryCell = (props) => {
  const { item, contestImgUrl } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={images.passwordIcon}
          style={styles.lotteryImage}
        />
      </View>

    <View style={styles.detailContainer}>
      <Text style={styles.lotteryTitle}> Won Audi R8</Text>
      <View style={styles.subContainer}>
        <View style={styles.ticketContainer}>
          <MultiSlider
            min={0}
            max={100}
            // values={[item.fill_percent]}
            selectedStyle={{
              backgroundColor: 'green',
            }}
            unselectedStyle={{
              backgroundColor: UIColors.grayBackgroundColor,
            }}
            containerStyle={{
              height: itemSizes.defaultButtonHeight,
            }}
            markerStyle={{
              borderRadius: spacing.semiMedium,
              height: spacing.semiMedium,
              width: spacing.semiMedium,
              backgroundColor: 'green',
            }}
            trackStyle={{
              height: spacing.semiMedium,
              backgroundColor: 'green',
            }}
            sliderLength={120}
          />
          <Text style={styles.lotteryFillPercent}>
            {/* {Math.trunc(item.fill_percent)} */}
            %
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.playBtn}>
          <Text style={styles.txtStyle}>{Localization.homeScreen.Play}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.openDetailBtn}>
          <Text style={styles.txtStyle}>...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

LotteryCell.propTypes = {
};

LotteryCell.defaultProps = {

};

export default LotteryCell;
