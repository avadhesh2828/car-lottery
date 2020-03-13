/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
import isIOS from '../../../utils/plateformSpecific';
import { images } from '../../../assets/images';
import { responsiveFontSize } from '../../../utils/utils_functions';
import { responsiveSize } from '../../../utils/utils';
import { Localization } from '../../../utils/localization';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: spacing.extraExtraSmall,
    borderColor: UIColors.grayBackgroundColor,
    padding: spacing.semiMedium,
    height: itemSizes.defaultHeight,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  winnerStatusContainer: {
    marginLeft: spacing.medium,
    borderRadius: spacing.smallHalf,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.extraSmallButtonHeight,
    backgroundColor: UIColors.navigationBar,
  },
  lotterytextContainer: {
    flex: 2,
    borderRadius: spacing.smallHalf,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: itemSizes.extraSmallButtonHeight,
    marginRight: spacing.small,
  },
  TicketNumbertextContainer: {
    flex: 2,
    borderRadius: spacing.smallHalf,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: itemSizes.extraSmallButtonHeight,
  },
  textConatiner: {
    flex: 1,
    marginLeft: spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.extraSmallButtonHeight,
  },
  lotteryTitle: {
    fontSize: fontSizes.extraExtraSmall,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
  },
  ticketNumbertext: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.purpleButtonColor,
    fontFamily: fontName.sourceSansProBold,
  },
  winnerStatustext: {
    textAlign: 'center',
    fontSize: fontSizes.extraExtraSmall,
    color: UIColors.appBackGroundColor,
    fontFamily: fontName.sourceSansProRegular,
  },
  subContainer: {
    flex: 5,
    flexDirection: 'row',
    height: itemSizes.extraSmallButtonHeight,
  },
});


const PrizeModelCell = (props) => {
  const { item, contestImgUrl } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.lotterytextContainer}><Text style={styles.lotteryTitle}>{item.item.consolation_prize}</Text></View>
      {
       (parseInt(item.item.winner_status) > 0) ? (
         <View style={styles.subContainer}>

           <View style={styles.TicketNumbertextContainer}><Text style={styles.ticketNumbertext}>{item.item.winner_ticket_number}</Text></View>
           <View style={{ flex: 1 }}>
             {item.item.is_my_ticket
               ? (
                 <View style={styles.winnerStatusContainer}>
                   <Text style={styles.winnerStatustext}>{Localization.myPrizeModelScreen.youwon}</Text>
                 </View>
               ) : null}
           </View>
         </View>
       )
         : null
      }
    </View>
  );
};

PrizeModelCell.propTypes = {
  item: PropTypes.object,
};

PrizeModelCell.defaultProps = {
  item: {},
};

export default PrizeModelCell;
