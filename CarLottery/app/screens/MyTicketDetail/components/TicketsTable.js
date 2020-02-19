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
    paddingHorizontal: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketNumber: {
    flex: 1,
    paddingHorizontal: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',

  },
  date: {
    flex: 1,
    paddingHorizontal: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  printContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
      <Text style={styles.rowTitleTxt}>#</Text>
    </View>
    <View style={styles.ticketNumber}>
      <Text style={styles.rowTitleTxt}>Ticket</Text>
    </View>
    <View style={styles.date}>
      <Text style={styles.rowTitleTxt}>Bought at</Text>
    </View>
    <View style={[styles.printContainer, { width: itemSizes.largeWidth }]}>
      <Text style={styles.rowTitleTxt}>Print</Text>
    </View>
  </View>
);

const TicketsTable = (props) => (
  <View style={styles.tableContainer}>
    {props.ticketList !== 0 && (
      <FlatList
        key="v"
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        ListHeaderComponent={FlatlistHeader}
        data={props.ticketList}
        onEndThreshold={0.1}
        refreshControl={(
          <RefreshControl
            refreshing={false}
          />
      )}
        renderItem={(item) => (
          <View style={styles.tableRow}>
            <View style={styles.rowNumber}>
              <Text style={styles.rowTxt}>1</Text>
            </View>
            <View style={styles.ticketNumber}>
              <Text style={styles.rowTxt}>20 14 26 55 60 47 01 32</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.rowTxt}>2 jan 2020 8:20 AM</Text>
            </View>
            <View style={styles.printContainer}>
              <TouchableOpacity style={styles.printBtn}>
                <Image
                  style={styles.printImage}
                  source={images.searchIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.printBtn}>
                <Image
                  style={styles.printImage}
                  source={images.searchIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
