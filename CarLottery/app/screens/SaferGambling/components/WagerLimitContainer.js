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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    marginTop: spacing.medium,
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

class WagerLimitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyWagerLimit: props.saferGambling.monthWagerLimitInfo ? props.saferGambling.monthWagerLimitInfo.amount : '',
      weeklyWagerLimit: props.saferGambling.weekWagerLimitInfo ? props.saferGambling.weekWagerLimitInfo.amount : '',
      dailyWagerLimit: props.saferGambling.dayWagerLimitInfo ? props.saferGambling.dayWagerLimitInfo.amount : '',
    };
  }

  componentDidMount() {
    this.props.getWagerLimitMonthsRequest({
      unit: 'MONTHS', duration: 1, amount: '', modified_date: '',
    });
    this.props.getWagerLimitWeeksRequest({
      unit: 'WEEKS', duration: 1, amount: '', modified_date: '',
    });
    this.props.getWagerLimitDaysRequest({
      unit: 'DAYS', duration: 1, amount: '', modified_date: '',
    });
  }

  // static getDerivedStateFromProps(props, current_state) {
  //   console.log('currentstate', current_state, 'props', props);
  //   if (props.saferGambling.monthWagerLimitInfo && current_state.monthlyWagerLimit !== props.saferGambling.monthWagerLimitInfo.amount) {
  //     console.log('propsAm===', props.saferGambling.monthWagerLimitInfo.amount);
  //     return {
  //       monthlyWagerLimit: props.saferGambling.monthWagerLimitInfo.amount,
  //       // computed_prop: heavy_computation(props.value)
  //     };
  //   }
  //   return null;
  // }

  onPressSetBtn() {
    if (this.state.monthlyWagerLimit) {
      this.props.setWagerLimitMonthsRequest({
        user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'MONTHS', duration: '1', amount: this.state.monthlyWagerLimit, modified_date: '',
      });
    }
    if (this.state.weeklyWagerLimit) {
      this.props.setWagerLimitWeeksRequest({
        user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'WEEKS', duration: 1, amount: this.state.weeklyWagerLimit, modified_date: '',
      });
    }
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.dailyWagerLimit) {
      this.props.setWagerLimitDaysRequest({
        user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'DAYS', duration: 1, amount: this.state.dailyWagerLimit, modified_date: '',
      });
    }
  }

  onPressResetBtn() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.dailyWagerLimit || this.state.monthlyWagerLimit || this.state.weeklyWagerLimit) {
      this.props.deleteWagerLimitRequest({});
    }
  }

  selectedMonthlyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ monthlyWagerLimit: element.item });
      }
    });
  }

  selectedWeeklyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ weeklyWagerLimit: element.item });
      }
    });
  }

  selectedDailyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ dailyWagerLimit: element.item });
      }
    });
  }


  render() {
    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        <Text style={styles.textStyle}>{Localization.SaferGamblingScreen.dummyText}</Text>
        <View style={styles.limitContainer}>
          <Text style={styles.textStyle}>Monthly Limit</Text>
          <View style={[styles.textInputContainer, {}]}>
            <Dropdown
              fontSize={15}
              containerStyle={[styles.dropdownStyle, {}]}
              dropdownOffset={{ top: 0, left: 0 }}
              label={'Select monthly wager limit'}
              value={this.state.monthlyWagerLimit ? `₦${this.state.monthlyWagerLimit}` : ''}
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
              label={'Select weeky wager limit'}
              dropdownOffset={{ top: 0, left: 0 }}
              textColor={UIColors.blackTxt}
              data={weeklyDropdownLimits}
              value={this.state.weeklyWagerLimit ? `₦${this.state.weeklyWagerLimit}` : ''}
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
              dropdownOffset={{ top: 0, left: 0 }}
              label={'Select daily wager limit'}
              textColor={UIColors.blackTxt}
              data={dailyDropdownLimits}
              value={this.state.dailyWagerLimit ? `₦${this.state.dailyWagerLimit}` : ''}
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

WagerLimitContainer.propTypes = {
  saferGambling: PropTypes.object,
};

WagerLimitContainer.defaultProps = {
  saferGambling: {},
};

const mapStateToProps = (state) => ({
  // dashboard: state.dashboardReducer,
  saferGambling: state.SaferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

// eslint-disable-next-line max-len
const WagerLimitContainerScreen = connect(mapStateToProps, mapDispatchToProps)(WagerLimitContainer);

export default WagerLimitContainerScreen;
