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
import { images } from '../../../assets/images';
// import { responsiveFontSize } from '../../../utils/utils_functions';
import { responsiveSize } from '../../../utils/utils';
import { Localization } from '../../../utils/localization';
import isIOS from '../../../utils/plateformSpecific';
import UserActions from '../../../actions';
import { UserData } from '../../../utils/global';
import DateManager from '../../../utils/dateManager';

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
    paddingLeft: spacing.extraSmall,
    // backgroundColor: 'orange',
    zIndex: 60,
    marginVertical: spacing.small,
    // top: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 3,
    marginRight: spacing.large,
    marginLeft: spacing.small,
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
  cancelButton: {
    width: '20%',
    backgroundColor: UIColors.grayBackgroundColor,
    marginLeft: spacing.small,
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
  cancelTxt: {
    color: UIColors.blackTxt,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
});

const monthlyDropdownLimits = [{ value: '₦250', item: '250' }, { value: '₦100', item: '100' }, { value: '₦50', item: '50' }, { value: '₦20', item: '20' }, { value: '₦10', item: '10' }];
const weeklyDropdownLimits = [{ value: '₦50', item: '50' }, { value: '₦40', item: '40' }, { value: '₦30', item: '30' }, { value: '₦20', item: '20' }, { value: '₦10', item: '10' }];
const dailyDropdownLimits = [{ value: '₦20', item: '20' }, { value: '₦10', item: '10' }, { value: '₦5', item: '5' }];

class DepositLimitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyDepositLimit: props.saferGambling.monthDepositLimitInfo ? props.saferGambling.monthDepositLimitInfo.amount : '',
      weeklyDepositLimit: props.saferGambling.weekDepositLimitInfo ? props.saferGambling.weekDepositLimitInfo.amount : '',
      dailyDepositLimit: props.saferGambling.dayDepositLimitInfo ? props.saferGambling.dayDepositLimitInfo.amount : '',
    };
  }

  componentDidMount() {
    this.props.getDepositLimitMonthsRequest({
      unit: 'MONTHS', duration: 1, amount: '', modified_date: '',
    });
    this.props.getDepositLimitWeeksRequest({
      unit: 'WEEKS', duration: 1, amount: '', modified_date: '',
    });
    this.props.getDepositLimitDaysRequest({
      unit: 'DAYS', duration: 1, amount: '', modified_date: '',
    });
  }

  static getDerivedStateFromProps(props, current_state) {
    if (props.saferGambling.monthDepositLimitInfo && current_state.monthlyDepositLimit !== props.saferGambling.monthDepositLimitInfo.amount) {
      return {
        monthlyDepositLimit: props.saferGambling.monthDepositLimitInfo.amount,
      };
    }
    if (props.saferGambling.weekDepositLimitInfo && current_state.weeklyDepositLimit !== props.saferGambling.weekDepositLimitInfo.amount) {
      return {
        weeklyDepositLimit: props.saferGambling.weekDepositLimitInfo.amount,
      };
    }
    if (props.saferGambling.dayDepositLimitInfo && current_state.dailyDepositLimit !== props.saferGambling.dayDepositLimitInfo.amount) {
      return {
        dailyDepositLimit: props.saferGambling.dayDepositLimitInfo.amount,
      };
    }
    return null;
  }

  onPressSetBtn() {
    if (this.state.monthlyDepositLimit) {
      this.props.setDepositLimitMonthsRequest({
        user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'MONTHS', duration: '1', amount: this.state.monthlyDepositLimit, modified_date: '',
      });
    }
    if (this.state.weeklyDepositLimit) {
      this.props.setDepositLimitWeeksRequest({
        user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'WEEKS', duration: 1, amount: this.state.weeklyDepositLimit, modified_date: '',
      });
    }
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.dailyDepositLimit) {
      this.props.setDepositLimitDaysRequest({
        user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'DAYS', duration: 1, amount: this.state.dailyDepositLimit, modified_date: '',
      });
    }
  }

  onPressResetBtn() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.dailyDepositLimit || this.state.monthlyDepositLimit || this.state.weeklyDepositLimit) {
      this.props.deleteDepositLimitRequest({});
    }
  }

  selectedMonthlyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ monthlyDepositLimit: element.item });
      }
    });
  }

  selectedWeeklyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ weeklyDepositLimit: element.item });
      }
    });
  }

  selectedDailyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ dailyDepositLimit: element.item });
      }
    });
  }

  disableDropdown(depositLimitInfo) {
    if (depositLimitInfo && depositLimitInfo.modified_date && DateManager.lessThan24Hours(depositLimitInfo.modified_date)) {
      return true;
    }
    return false;
  }


  render() {
    const { saferGambling } = this.props;
    const { monthDepositLimitInfo, weekDepositLimitInfo, dayDepositLimitInfo } = saferGambling;
    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        {/* <Text style={styles.textStyle}>{Localization.SaferGamblingScreen.dummyText}</Text> */}
        <View style={styles.limitContainer}>
          <Text style={styles.textStyle}>Monthly Limit</Text>
          <View style={[styles.textInputContainer, {}]}>
            <Dropdown
              fontSize={15}
              disabled={this.disableDropdown(monthDepositLimitInfo)}
              containerStyle={[styles.dropdownStyle, {}]}
              dropdownOffset={{ top: 0, left: 0 }}
              label={'Select monthly deposit limit'}
              value={this.state.monthlyDepositLimit ? `₦${this.state.monthlyDepositLimit}` : ''}
              textColor={UIColors.blackTxt}
              data={monthlyDropdownLimits}
              onChangeText={(item, index, data) => this.selectedMonthlyItem(item, index, data)}
              inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
            />
          </View>
        </View>
        <View style={styles.limitContainer}>
          <Text style={styles.textStyle}>Weekly Limit</Text>
          <View style={[styles.textInputContainer, {}]}>
            <Dropdown
              fontSize={15}
              containerStyle={[styles.dropdownStyle, {}]}
              disabled={this.disableDropdown(weekDepositLimitInfo)}
              label={'Select weeky deposit limit'}
              dropdownOffset={{ top: 0, left: 0 }}
              textColor={UIColors.blackTxt}
              data={weeklyDropdownLimits}
              value={this.state.weeklyDepositLimit ? `₦${this.state.weeklyDepositLimit}` : ''}
              onChangeText={(item, index, data) => this.selectedWeeklyItem(item, index, data)}
              inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
            />
          </View>
        </View>
        <View style={styles.limitContainer}>
          <Text style={styles.textStyle}>Daily Limit</Text>
          <View style={[styles.textInputContainer, {}]}>
            <Dropdown
              fontSize={15}
              containerStyle={[styles.dropdownStyle, {}]}
              disabled={this.disableDropdown(dayDepositLimitInfo)}
              dropdownOffset={{ top: 0, left: 0 }}
              label={'Select daily deposit limit'}
              textColor={UIColors.blackTxt}
              data={dailyDropdownLimits}
              value={this.state.dailyDepositLimit ? `₦${this.state.dailyDepositLimit}` : ''}
              onChangeText={(item, index, data) => this.selectedDailyItem(item, index, data)}
              inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.updateButton} onPress={() => this.onPressSetBtn()}>
            <Text style={styles.updateTxt}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => this.onPressResetBtn()}>
            <Text style={styles.cancelTxt}>Reset</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

DepositLimitContainer.propTypes = {
  saferGambling: PropTypes.object,
};

DepositLimitContainer.defaultProps = {
  saferGambling: {},
};

const mapStateToProps = (state) => ({
  // dashboard: state.dashboardReducer,
  saferGambling: state.saferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

// eslint-disable-next-line max-len
const DepositLimitContainerScreen = connect(mapStateToProps, mapDispatchToProps)(DepositLimitContainer);

export default DepositLimitContainerScreen;
