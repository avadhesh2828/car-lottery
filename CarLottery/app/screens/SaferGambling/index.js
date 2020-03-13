import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserActions from '../../actions';
import NavigationHeader from '../../components/NavigationHeader';
import TabBar from '../../components/TabBar';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import DepositLimitContainer from './components/DepositLimitContainer';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: UIColors.navigationBar,
    flex: 1,
  },
  subContainer: {
    backgroundColor: UIColors.appBackGroundColor,
    flex: 1,
  },
  tabbarHeader: {
    height: itemSizes.searchHeader,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.semiMedium,
    marginBottom: spacing.semiMedium,
    // backgroundColor: UIColors.purpleButtonColor,
  },
  tabContainer: {
    flex: 1,
  },
});

class SaferGambling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  componentDidMount() {
    // this.getDepositLimits();
    this.getWagerLimits();
  }

  onTabPress(tab, index) {
    this.setState({
      tabIndex: index,
    });
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
          <View style={styles.tabbarHeader}>
            <TabBar
              tabsList={[
                'Deposit limit',
                'Wager Limit',
                'Timeout',
                'Self-Exclusion',
              ]}
              onTabSelect={(tab, index) => this.onTabPress(tab, index)}
            />
          </View>
          <View style={styles.tabContainer}>
            {this.state.tabIndex === 0
            && <DepositLimitContainer />}
            {this.state.tabIndex === 1
            && <DepositLimitContainer />}
          </View>
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
