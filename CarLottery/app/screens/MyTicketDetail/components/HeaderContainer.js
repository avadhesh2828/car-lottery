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
    flex: 1.5,
  },
  nameViewOther: {
    flex: 1,
  },
  titleTxt: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.grayText,
    fontFamily: fontName.sourceSansProRegular,
  },
  valueTxt: {
    fontSize: fontSizes.extraSmall,
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
        <Text style={styles.titleTxt}>{Localization.myTicketDetailsScreen.Name}</Text>
        <Text style={styles.valueTxt} numberOfLines={2}>{props.selectedContestDetails.contest_name}</Text>
      </View>
      <View style={styles.nameViewOther}>
        <Text style={styles.titleTxt}>{Localization.myTicketDetailsScreen.TicketPrice}</Text>
        <Text style={styles.valueTxt}>
          ₦
          {props.selectedContestDetails.entry_fee}
        </Text>
      </View>
      <View style={styles.nameViewOther}>
        <Text style={styles.titleTxt}>{Localization.myTicketDetailsScreen.TicketBought}</Text>
        <Text style={styles.valueTxt}>{props.selectedContestDetails.total_ticket_bought}</Text>
      </View>
    </View>

    <View style={styles.subContainer}>
      <View style={styles.SearchContainer}>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.textInputStyle}
          placeholder={'Search by Lottery name'}
          placeholderTextColor={UIColors.grayText}
          onChangeText={(text) => props.onChangeText(text)}
          clearButtonMode={'always'}
          value={props.searchValue}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => props.searchText()}>
          <Image style={styles.searchIconStyle} source={images.searchIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.prizeButton} onPress={() => props.onPressPrizeModel(props.item)}>
        <Text style={styles.buyTxt}>{Localization.myTicketDetailsScreen.Prizes}</Text>
      </TouchableOpacity>
      {
      props.item.status === '1'
        ? (
          <TouchableOpacity style={styles.buyButton} onPress={() => props.buyLottery(props.item)}>
            <Text style={styles.buyTxt}>{Localization.myTicketDetailsScreen.Play}</Text>
          </TouchableOpacity>
        )
        : null
      }
    </View>
  </View>
);

HeaderContainer.propTypes = {
};

HeaderContainer.defaultProps = {

};

export default HeaderContainer;
