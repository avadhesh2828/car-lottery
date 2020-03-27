import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { fontName, UIColors, fontSizes, spacing, itemSizes } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.APP_THEME_COLOUR,
    paddingHorizontal: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerViewText: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: 'black',
    fontSize: fontSizes.extraSmall,
  },
});

const DepositContainer = props => (
  <View style={styles.container}>
    <Text style={styles.headerViewText}>{'Coming Soon...'}</Text>
  </View>
);

DepositContainer.propTypes = {
  onDepositListClicked: PropTypes.func,
};

DepositContainer.defaultProps = {
  onDepositListClicked: () => {},
};

export default DepositContainer;
