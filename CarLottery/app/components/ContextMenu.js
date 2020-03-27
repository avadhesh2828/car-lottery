import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.newAppBackgroundColorBlack,
  },
  optionsView: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 80 : 50,
    paddingHorizontal: 10,
    flex: 1,
  },
  optionsListView: {
    marginBottom: 0,
  },
  buttonContainerWhite: {
    justifyContent: 'center',
    backgroundColor: UIColors.whiteTxt,
  },
  buttonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: UIColors.blackTxt,
  },
  cancelButton: {
    flex: 1,
    height: 55,
    justifyContent: 'center',
    backgroundColor: UIColors.whiteTxt,
  },
  showPopupContainer: {
    position: 'absolute',
    flex: 1,
  },
});

const ContextMenu = ({ children, cancelButtonAction }) => (
  <View style={[styles.showPopupContainer, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]}>
    <View style={styles.optionsView}>
      <View style={[styles.optionsListView]}>
        <View style={[styles.buttonContainerWhite, { width: Dimensions.get('window').width - 20 }]}>
          {children}
        </View>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => cancelButtonAction()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>

);

ContextMenu.propTypes = {
  children: PropTypes.node.isRequired,
  cancelButtonAction: PropTypes.func.isRequired,
};

export default ContextMenu;
