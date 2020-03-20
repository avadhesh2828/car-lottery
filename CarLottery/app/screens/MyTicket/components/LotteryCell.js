/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
import { images } from '../../../assets/images';
// import { responsiveFontSize } from '../../../utils/utils_functions';
import { responsiveSize } from '../../../utils/utils';
import { Localization } from '../../../utils/localization';
import isIOS from '../../../utils/plateformSpecific';
import MyTicketPrizeModel from '../../MyTicketPrizeModel';
import { screenNames } from '../../../utils/constant';
import Navigation from '../../../utils/navigation';

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
    // backgroundColor: 'yellow',
  },
  lotteryImage: {
    height: responsiveSize(150),
    width: '100%',
    resizeMode: 'stretch',
    // backgroundColor: 'red',
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
    alignSelf: 'flex-start',
    margin: spacing.semiMedium,
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
  entryfeeImage: {
    position: 'absolute',
    right: 0,
    top: 1,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    width: '30%',
    resizeMode: 'contain',
  },
  contestStatus: {
    position: 'absolute',
    left: 0,
    top: 1,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    width: '30%',
    resizeMode: 'contain',
  },
  entryFeeTextStyle: {
    position: 'absolute',
    right: 1,
    top: spacing.medium,
    marginRight: spacing.small,
    color: UIColors.appBackGroundColor,
    fontFamily: fontName.sourceSansProBold,
    fontSize: fontSizes.extraExtraSmall,
  },
  mainFillConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: UIColors.grayBackgroundColor,
    height: itemSizes.defaultHeight,
  },
  FilltextConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    color: UIColors.navigationBar,
  },
  contestFillContainer: {
    borderRadius: spacing.extraExtraSmall,
    backgroundColor: UIColors.grayBackgroundColor,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lotteryFillPercent: {
    flexDirection: 'row-reverse',
    paddingLeft: spacing.small,
    fontSize: fontSizes.extraSmall,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
  },
});


const LotteryCell = (props) => {
  const { item, contestImgUrl, onPressPrizeModel, buyLottery } = props;
  const fill_percent = Math.floor(parseInt(item.total_user_joined) / parseInt(item.contest_size) * 100);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: contestImgUrl(item.jackpot_prize_image) }}
          style={styles.lotteryImage}
        />
      </View>

      <Image style={styles.contestStatus} source={item.status === '1' ? images.livestatusIcon : images.Completed} />
      <Image
        source={images.enteryfeeIcon}
        style={styles.entryfeeImage}
      />
      <Text style={styles.entryFeeTextStyle}>
        ₦
        {item.entry_fee}
      </Text>
      <View style={styles.detailContainer}>
        <Text style={styles.lotteryTitle}>{item.contest_name}</Text>
        <View style={styles.subContainer}>
          {
            item.status === '1'
              ? (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={styles.contestFillContainer}>
                    <View style={fill_percent > 0 ? {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      borderRadius: spacing.extraExtraSmall,
                      // height: itemSizes.iconExtraSmall,
                      width: `${Math.trunc(fill_percent)}%`,
                      backgroundColor: 'green',
                    }
                      : {
                      }}
                    />
                  </View>
                  <Text style={styles.lotteryFillPercent}>
                    {Math.trunc(fill_percent)}
                    %
                  </Text>
                </View>
              )
              : item.is_winner === null ? <View style={styles.mainFillConatiner}><Text style={[styles.FilltextConatiner, { color: 'red' }]}>{Localization.myTicketScreen.Loss}</Text></View>
                : <View style={styles.mainFillConatiner}><Text style={styles.FilltextConatiner}>{Localization.myTicketScreen.Win}</Text></View>
            }
        </View>
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketTxt}>{Localization.homeScreen.TicketBrought}</Text>
          <Text style={[styles.ticketTxt, { fontSize: fontSizes.medium, marginLeft: 5 }]}>{item.total_ticket_bought}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {
          item.status === '1'
            ? (
              <TouchableOpacity style={styles.buyBtn} onPress={() => buyLottery(item)}>
                <Text style={styles.txtStyle}>{Localization.homeScreen.Play}</Text>
              </TouchableOpacity>
            )
            : null
        }
          <TouchableOpacity style={styles.viewBtn} onPress={() => Navigation.sharedInstance().pushToScreen(screenNames.MY_TICKET_DETAIL_SCREEN, { item })}>
            <Text style={styles.txtStyle}>{Localization.homeScreen.View}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.openDetailBtn} onPress={() => onPressPrizeModel(item)}>
            <Text style={styles.txtStyle}>...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

LotteryCell.propTypes = {
};

LotteryCell.defaultProps = {

};

export default LotteryCell;
