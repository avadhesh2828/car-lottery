import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { spacing, itemSizes, UIColors, fontName, fontSizes } from '../../../utils/variables';
import { images } from '../../../assets/images';
import { responsiveFontSize } from '../../../utils/utils_functions';
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
  },
  lotteryImage: {
    height: responsiveSize(150),
    width: '100%',
    resizeMode: 'stretch',
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
  buyBtn: {
    backgroundColor: UIColors.navigationBar,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.extraSmall,
  },
  viewBtn: {
    backgroundColor: UIColors.purpleButtonColor,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.extraSmall,
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
          source={{ uri: contestImgUrl(item.jackpot_prize_image) }}
          style={styles.lotteryImage}
        />
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.lotteryTitle}>{item.contest_name}</Text>
        <View style={styles.subContainer}>
          {/* <View style={styles.ticketContainer}>
            <Text style={styles.ticketTxt}>{Localization.homeScreen.TicketBrought}</Text>
            <Text style={[styles.ticketTxt, { fontSize: fontSizes.medium, marginLeft: 5 }]}>3</Text>
          </View> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buyBtn} onPress={() => props.buyLottery(item)}>
            <Text style={styles.txtStyle}>{Localization.homeScreen.Buy}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.txtStyle}>{Localization.homeScreen.View}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.openDetailBtn}>
            <Text style={styles.txtStyle}>...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

LotteryCell.propTypes = {
  item: PropTypes.object,
};

LotteryCell.defaultProps = {
  item: {},
};

export default LotteryCell;
