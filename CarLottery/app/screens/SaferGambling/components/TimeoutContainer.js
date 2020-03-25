/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  spacing, itemSizes, UIColors, fontName, fontSizes,
} from '../../../utils/variables';
// import { responsiveFontSize } from '../../../utils/utils_functions';
import { Localization } from '../../../utils/localization';
import isIOS from '../../../utils/plateformSpecific';
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
  limitContainer: {
    marginHorizontal: spacing.small,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    alignItems: 'center',
    marginTop: spacing.large,
  },
  limitTxt: {
    color: UIColors.blackTxt,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  dropdownStyle: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    paddingTop: spacing.large,
    paddingLeft: spacing.extraSmall,
    zIndex: 60,
    marginVertical: spacing.small,
    // top: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 3,
    marginRight: spacing.large,
    marginLeft: spacing.small,
    marginTop: spacing.semiMedium,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.extraLarge,
  },
  updateButton: {
    width: '20%',
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

const monthlyDropdownLimits = [
  { value: '30 days', duration: '30', unit: 'Days' },
  { value: '7 days', duration: '7', unit: 'Days' },
  { value: '1 days', duration: '1', unit: 'Days' },
  { value: '6 hours', duration: '6', unit: 'Hours' },
];

class TimeoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeoutLimit: '',
    };
  }

  componentDidMount() {
  }

  onPressSetBtn() {
    if (this.state.timeoutLimit) {
      showOptionAlert(
        Localization.alert,
        'Are you sure you want to time out',
        'yes',
        'no',
        (text) => text === 0 && this.props.selfTimeoutRequest({
          unit: this.state.timeoutLimit.unit, duration: this.state.timeoutLimit.duration,
        }),
      );
    }
  }

  selectedTimeoutItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({
          timeoutLimit: { duration: element.duration, unit: element.unit },
        });
      }
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        {/* <Text style={styles.textStyle}>{Localization.SaferGamblingScreen.dummyText}</Text> */}
        <View style={styles.limitContainer}>
          <Text style={styles.textStyle}>Timeout Limit</Text>
          <View style={[styles.textInputContainer, {}]}>
            <Dropdown
              fontSize={15}
              containerStyle={[styles.dropdownStyle, {}]}
              dropdownOffset={{ top: 0, left: 0 }}
              label={'Select here'}
              value={this.state.timeoutLimit ? `${this.state.timeoutLimit}` : ''}
              textColor={UIColors.blackTxt}
              data={monthlyDropdownLimits}
              onChangeText={(item, index, data) => this.selectedTimeoutItem(item, index, data)}
              inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.updateButton} onPress={() => this.onPressSetBtn()}>
            <Text style={styles.updateTxt}>Submit</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

TimeoutContainer.propTypes = {
  saferGambling: PropTypes.object,
};

TimeoutContainer.defaultProps = {
  saferGambling: {},
};

const mapStateToProps = (state) => ({
  // dashboard: state.dashboardReducer,
  saferGambling: state.saferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

// eslint-disable-next-line max-len
const TimeoutContainerScreen = connect(mapStateToProps, mapDispatchToProps)(TimeoutContainer);

export default TimeoutContainerScreen;
