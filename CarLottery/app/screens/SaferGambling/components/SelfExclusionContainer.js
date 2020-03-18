/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
// import { responsiveFontSize } from '../../../utils/utils_functions';
import { Localization } from '../../../utils/localization';
import UserActions from '../../../actions';
import { showOptionAlert } from '../../../utils/showAlert';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: spacing.small,
  },
  textStyle: {
    color: UIColors.blackTxt,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraExtraSmall,
    paddingHorizontal: spacing.small,
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.extraLarge,
  },
  updateButton: {
    // width: ,
    backgroundColor: UIColors.purpleButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  updateTxt: {
    color: UIColors.whiteTxt,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
});

class SelfExclusionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  onPressSetBtn() {
    showOptionAlert(
      Localization.alert,
      'Are you sure you want to self-exclude yourself',
      'yes',
      'no',
      (text) => text === 0 && this.props.suspendUserRequest({}),
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        {/* <Text style={styles.textStyle}>{Localization.SaferGamblingScreen.dummyText}</Text> */}
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.updateButton} onPress={() => this.onPressSetBtn()}>
            <Text style={styles.updateTxt}>Deactivate Account</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

SelfExclusionContainer.propTypes = {
  saferGambling: PropTypes.object,
};

SelfExclusionContainer.defaultProps = {
  saferGambling: {},
};

const mapStateToProps = (state) => ({
  saferGambling: state.saferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

// eslint-disable-next-line max-len
const SelfExclusionContainerScreen = connect(mapStateToProps, mapDispatchToProps)(SelfExclusionContainer);

export default SelfExclusionContainerScreen;
