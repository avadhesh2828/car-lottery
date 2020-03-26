import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
import { images } from '../../../assets/images';
import DateManager from '../../../utils/dateManager';
import { Localization } from '../../../utils/localization';

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  seperator: {
    flex: 1,
    height: 1,
    backgroundColor: UIColors.grayText,
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: spacing.small,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  rowNumber: {
    flex: 1,
    paddingTop: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketNumber: {
    flex: 1,
    paddingTop: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',

  },
  date: {
    flex: 1,
    paddingTop: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTxt: {
    color: UIColors.textTitle,
    fontSize: fontSizes.tiny,
    fontFamily: fontName.sourceSansProRegular,
  },
  rowTitleTxt: {
    color: UIColors.grayText,
    fontSize: fontSizes.tiny,
    fontFamily: fontName.sourceSansProRegular,
  },
});
const FlatlistHeader = () => (
  <View style={styles.headerRow}>
    <View style={styles.rowNumber}>
      <Text style={styles.rowTitleTxt}>{Localization.inviteFriend.email}</Text>
    </View>
    <View style={styles.ticketNumber}>
      <Text style={styles.rowTitleTxt}>{Localization.inviteFriend.status}</Text>
    </View>
    <View style={styles.date}>
      <Text style={styles.rowTitleTxt}>{Localization.inviteFriend.date}</Text>
    </View>
  </View>
);

const InviteFriendList = (props) => (
  <View style={styles.tableContainer}>
    {props.userInviteResponse !== 0 && (
    <FlatList
      key="v"
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      ListHeaderComponent={FlatlistHeader}
      data={props.userInviteResponse}
      extraData={props}
      onEndThreshold={0.1}
      refreshControl={(
        <RefreshControl
          refreshing={false}
        />
      )}
      renderItem={(item) => {
        const date = new Date(item.item.created_date);
        const matchDate = DateManager.formatDateToString(date);
        const time = DateManager.DisplayCurrentTime(date);
        return (
          <View style={styles.tableRow}>
            <View style={styles.rowNumber}>
              <Text style={styles.rowTxt}>{item.item.email}</Text>
            </View>
            <View style={styles.ticketNumber}>
              <Text style={styles.rowTxt}>{item.item.status === '0' ? Localization.inviteFriend.pending : Localization.inviteFriend.accept}</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.rowTxt}>
                {matchDate}
                {' '}
                {time}
              </Text>
            </View>
          </View>
        );
      }}
    />
    )}
  </View>
);

InviteFriendList.propTypes = {
  ticketList: PropTypes.array,
};

InviteFriendList.defaultProps = {
  ticketList: [],
};

export default InviteFriendList;
