import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { fontName, UIColors, fontSizes, spacing, itemSizes } from '../../../utils/variables';
import TransactionList from './TransactionList';

// Demo data to be deleted
const demoData = [
  { type: 'Deposit', date: '15 March', value: '+2000K' },
  { type: 'Deposit', date: '15 April', value: '+2000M' },
  { type: 'Withdraw', date: '15 May', value: '+2000B' },
  { type: 'Withdraw', date: '15 June', value: '+2000T' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium,
    padding: spacing.extraSmall,
  },
  headerView: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerViewText: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: 'black',
    fontSize: fontSizes.extraSmall,
  },
  ListContainer: {
    flex: 1,
  },
  headerButton: {
    backgroundColor: UIColors.primary,
    borderRadius: spacing.extraSmall,
    borderColor: UIColors.defaultBlack,
    borderWidth: 1,
    paddingHorizontal: spacing.medium,
    padding: spacing.extraSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.defaultWhite,
    fontSize: fontSizes.extraSmall,
  },
  ItemSeparatorStyle: {
    height: spacing.border,
    width: '100%',
    backgroundColor: UIColors.defaultWhite,
  },
});

const TransactionContainer = props => (
  <View style={styles.container}>
    <View style={styles.headerView}>
      <Text style={styles.headerViewText}>{'RECENT TRANSACTIONS'}</Text>
      <TouchableOpacity onPress={() => props.onTransactionListClicked()} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>{'SEE ALL'}</Text>
      </TouchableOpacity>
    </View>

    {/* Rendering of transaction list using react-native's build in component
      * FlatList. Using components TransactionRow to render Rows of the list
      * and simple View component to render line seperator. */}
    <View style={styles.ListContainer}>
      <TransactionList data={props.paymentsList} showTypeImages={false} />
    </View>
  </View>
);

TransactionContainer.propTypes = {
  onTransactionListClicked: PropTypes.func,
};

TransactionContainer.defaultProps = {
  onTransactionListClicked: () => {},
};

export default TransactionContainer;
