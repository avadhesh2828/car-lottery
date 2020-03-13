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
  updateTxt: {
    color: UIColors.whiteTxt,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
});

const monthlyDropdownLimits = [{ value: '₦250', item: '250' }, { value: '₦100', item: '100' }, { value: '₦50', item: '50' }, { value: '₦20', item: '20' }, { value: '₦10', item: '10' }];

class TimeoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyDepositLimit: props.saferGambling.monthDepositLimitInfo ? props.saferGambling.monthDepositLimitInfo.amount : '',
    };
  }

  componentDidMount() {
  }

  // static getDerivedStateFromProps(props, current_state) {
  //   console.log('currentstate', current_state, 'props', props);
  //   if (props.saferGambling.monthDepositLimitInfo && current_state.monthlyDepositLimit !== props.saferGambling.monthDepositLimitInfo.amount) {
  //     console.log('propsAm===', props.saferGambling.monthDepositLimitInfo.amount);
  //     return {
  //       monthlyDepositLimit: props.saferGambling.monthDepositLimitInfo.amount,
  //       // computed_prop: heavy_computation(props.value)
  //     };
  //   }
  //   return null;
  // }

  onPressSetBtn() {
    // if (this.state.monthlyDepositLimit) {
    //   this.props.setDepositLimitMonthsRequest({
    //     user_id: UserData.ProfileData.user_id, preferred_type: '0', unit: 'MONTHS', duration: '1', amount: this.state.monthlyDepositLimit, modified_date: '',
    //   });
    // }
  }

  selectedMonthlyItem(item, index, data) {
    data.forEach((element) => {
      if (item === element.value) {
        this.setState({ monthlyDepositLimit: element.item });
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
              label={'Select here'}
              value={this.state.monthlyDepositLimit ? `₦${this.state.monthlyDepositLimit}` : ''}
              textColor={UIColors.blackTxt}
              data={monthlyDropdownLimits}
              onChangeText={(item, index, data) => this.selectedMonthlyItem(item, index, data)}
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
  saferGambling: state.SaferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

// eslint-disable-next-line max-len
const TimeoutContainerScreen = connect(mapStateToProps, mapDispatchToProps)(TimeoutContainer);

export default TimeoutContainerScreen;
