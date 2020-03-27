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
    paddingTop: spacing.small,
    paddingHorizontal: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketNumber: {
    flex: 1,
    paddingTop: spacing.small,
    paddingHorizontal: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',

  },
  date: {
    flex: 1,
    paddingTop: spacing.small,
    paddingHorizontal: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  printContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.small,
    paddingHorizontal: spacing.extraSmall,
    // backgroundColor: 'green',
  },
  printBtn: {
    backgroundColor: UIColors.purpleButtonColor,
    padding: spacing.extraExtraSmall,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.extraSmall,
  },
  printImage: {
    width: itemSizes.iconExtraSmall,
    height: itemSizes.iconExtraSmall,
    tintColor: UIColors.appBackGroundColor,
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
      <Text style={styles.rowTitleTxt}>{Localization.myTicketDetailsScreen.serialNo}</Text>
    </View>
    <View style={styles.ticketNumber}>
      <Text style={styles.rowTitleTxt}>{Localization.myTicketDetailsScreen.Ticket}</Text>
    </View>
    <View style={styles.date}>
      <Text style={styles.rowTitleTxt}>{Localization.myTicketDetailsScreen.Boughtat}</Text>
    </View>
    <View style={[styles.printContainer, { width: itemSizes.largeWidth }]}>
      <Text style={styles.rowTitleTxt}>{Localization.myTicketDetailsScreen.Print}</Text>
    </View>
  </View>
);

const TicketsTable = (props) => (
  <View style={styles.tableContainer}>
    {props.myContestTickets !== 0 && (
    <FlatList
      key="v"
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      ListHeaderComponent={FlatlistHeader}
      data={props.myContestTickets}
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
              <Text style={styles.rowTxt}>{item.index + 1}</Text>
            </View>
            <View style={styles.ticketNumber}>
              <Text style={styles.rowTxt}>{item.item.ticket_number}</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.rowTxt}>
                {matchDate.toString()}
                {' '}
                {time.toString()}
              </Text>
            </View>
            <View style={styles.printContainer}>
              <TouchableOpacity style={styles.printBtn}>
                <Image
                  style={styles.printImage}
                  source={images.print}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.printBtn}>
                <Image
                  style={styles.printImage}
                  source={images.download}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
    )}
  </View>
);

TicketsTable.propTypes = {
  ticketList: PropTypes.array,
};

TicketsTable.defaultProps = {
  ticketList: [],
};

export default TicketsTable;
