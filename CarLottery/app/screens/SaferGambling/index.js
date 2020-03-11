import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserActions from '../../actions';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: UIColors.navigationBar,
  },
  subContainer: {
    backgroundColor: UIColors.appBackGroundColor,
  },
});

class SaferGambling extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getDepositLimits();
    this.getWagerLimits();
  }

  getDepositLimits() {
    this.props.getDepositLimitMonthsRequest({ unit: 'MONTHS', duration: 1, amount: '', modified_date: '' });
    this.props.getDepositLimitWeeksRequest({ unit: 'WEEKS', duration: 1, amount: '', modified_date: '' });
    this.props.getDepositLimitDaysRequest({ unit: 'DAYS', duration: 1, amount: '', modified_date: '' });
  }

  getWagerLimits() {
    this.props.getWagerLimitMonthsRequest({ unit: 'MONTHS', duration: 1, amount: '', modified_date: '' });
    this.props.getWagerLimitWeeksRequest({ unit: 'WEEKS', duration: 1, amount: '', modified_date: '' });
    this.props.getWagerLimitDaysRequest({ unit: 'DAYS', duration: 1, amount: '', modified_date: '' });
  }

  render() {
    // const {} = this.state;
    const { saferGambling } = this.props;
    // const {} = saferGambling;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          showBackButton
          showRightImageIcon
          showRightBellImageIcon
          rightImageIcon
          // onPressRightIcon={() => { this.onChangeView(); }}
        />
        <View style={styles.subContainer}>
        </View>
      </SafeAreaView>
    );
  }
}

SaferGambling.propTypes = {
};

SaferGambling.defaultProps = {
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  saferGambling: state.SaferGamblingReducer,
});

const mapDispatchToProps = () => UserActions;

const saferGamblingScreen = connect(mapStateToProps, mapDispatchToProps)(SaferGambling);

export default saferGamblingScreen;
