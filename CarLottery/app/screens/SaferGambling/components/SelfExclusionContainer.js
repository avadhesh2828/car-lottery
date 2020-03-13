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
import { responsiveSize } from '../../../utils/utils';
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

class TimeoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

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
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.updateButton} onPress={() => this.onPressSetBtn()}>
            <Text style={styles.updateTxt}>Deactivate Container</Text>
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
