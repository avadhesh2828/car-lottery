import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { images } from '../../../assets/images';
import { fontName, UIColors, fontSizes, spacing, itemSizes } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparatorStyle: {
    height: spacing.border,
    width: '100%',
    backgroundColor: UIColors.defaultWhite,
  },
});

/* Main Component which is rendering the transaction list using flatList . */
const TransactionList = props => (
  <FlatList
    data={props.data}
    showsVerticalScrollIndicator={false}
    renderItem={item => <TransactionRow element={item.item} containerProps={props} />}
    ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
  />
);

TransactionList.propTypes = {
  data: PropTypes.array,
};

TransactionList.defaultProps = {
  data: [],
};

/* Component which defines for individual row in transaction list
 * It has separate styles and props validation mechanisms. */
const rowStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.semiMedium,
  },
  rowTypeText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
    paddingTop: spacing.extraSmall,
    flex: 1,
  },
  typeImageViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeImageStyle: {
    width: itemSizes.iconMedium,
    height: itemSizes.iconMedium,
    marginRight: spacing.semiMedium,
    alignSelf: 'center',
    marginTop: spacing.extraSmall,
  },
  centerTextStyle: {
    color: UIColors.textTitle,
    textAlign: 'center',
  },
  rightTextStyle: {
    color: 'orange',
    textAlign: 'center',
  },
});

function findTransactionType(elementStatus, depositStatus) {
  const isTransactionTypeDeposit = elementStatus === 'credit' || depositStatus;
  return isTransactionTypeDeposit;
}

const TransactionRow = props => (
  <View style={rowStyles.container}>
    <Text style={[rowStyles.rowTypeText, rowStyles.centerTextStyle, { flex: 0.5 }]}>
      {props.element.amount}
    </Text>

    {/* Text component which displays date of transaction: DD/Month */}
    <Text style={[rowStyles.rowTypeText, rowStyles.centerTextStyle, { flex: 0.8 }]}>
      {props.element.created_date.substring(0, 16)}
    </Text>

    {/* Text component which displays value of transaction */}
    <Text style={[rowStyles.rowTypeText, rowStyles.rightTextStyle, { color: 'black' }]}>
      {props.element.description}
    </Text>

    <Text style={[rowStyles.rowTypeText, rowStyles.rightTextStyle]}>
      {props.element.is_processed == 1 ? 'Completed' : 'Pending'}
    </Text>
  </View>
);

TransactionRow.propTypes = {
  element: PropTypes.objectOf(PropTypes.any),
  containerProps: PropTypes.objectOf(PropTypes.any),
  showTypeImages: PropTypes.bool,
};

TransactionRow.defaultProps = {
  element: {},
  containerProps: {},
  showTypeImages: true,
};

export default TransactionList;
