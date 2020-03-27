import React, { Component } from 'react';
import {
  SafeAreaView, View, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import Navigation from '../../utils/navigation';
// import Header from './components/Header';
import { images } from '../../assets/images';
// import AccountContainer from './components/containers/AccountContainer';
import { UIColors, spacing } from '../../utils/variables';

import { screenNames } from '../../utils/constant';
import TransactionContainer from './components/TransactionContainer';
import NavigationHeader from '../../components/NavigationHeader';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import DepositContainer from './components/DepositContainer';
import { responsiveSize } from '../../utils/utils';
import HeaderAd from '../../components/HeaderAd';
// import TransactionContainer from '../Account copy/components/containers/TransactionContainer';
// import TransactionContainer from '../Account copy/components/containers/TransactionContainer';

const initialData = [{
  amount: 'Amount', key: 0, created_date: 'Date', description: 'Description', is_processed: 'Status',
}];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'yellow' }}
    style={{ backgroundColor: UIColors.purpleButtonColor }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: focused ? 'yellow' : UIColors.whiteTxt, margin: 1, fontSize: responsiveSize(12) }}>
        {route.title}
      </Text>
    )}
  />
);

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
      // eslint-disable-next-line react/no-unused-state
      index: 0,
      // eslint-disable-next-line react/no-unused-state
      routes: [
        { key: 'first', title: 'Deposit' },
        { key: 'second', title: 'History' },
      ],
    };
  }


  componentDidMount() {
    this.props.getTransactionsRequest();
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  componentWillUnmount() {
  }

  onTransactionListClicked() {
    // Navigation.sharedInstance().pushToScreen(SCREENS.TRANSACTION_LIST, {});
  }

  render() {
    const { isPopupVisible } = this.state;
    const { dashboard } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: UIColors.navigationBar }}>

        <NavigationHeader
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
        />
        <KeyboardAwareScrollView style={{ backgroundColor: UIColors.appBackGroundColor, flex: 1 }}>
          <HeaderAd adData={dashboard.headerAd} />
          <TabView
            renderTabBar={renderTabBar}
            navigationState={this.state}
            scrollEnabled
            renderScene={SceneMap({
              first: () => <DepositContainer />,
              second: () => (
                <TransactionContainer
                  paymentsList={this.props.getTransactionsResponse.result}
                  onTransactionListClicked={() => this.onTransactionListClicked()}
                />
              ),
            })}
            onIndexChange={(index) => this.setState({ index })}
            initialLayout={{
              width: Dimensions.get('window').width,
              // height: Dimensions.get('window').height - 50,
            }}
          />
          <HeaderAd adData={dashboard.footerAd} />
        </KeyboardAwareScrollView>
        {this.props.isLoading
          && <Loader isAnimating={this.props.isLoading} />}
        {
      UserData.SessionKey && isPopupVisible
        ? (
          <PopUpScreen
            balance={this.props.profileResponse.balance}
            userName={this.props.profileResponse.user_name}
            logoutAction={() => this.props.logoutRequest()}
          />
        )
        : null
  }
      </SafeAreaView>
    );
  }
}

TransactionList.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  checkApplicantRequest: PropTypes.func,
  checkApplicantResponse: PropTypes.func,
  resetCheckApplicantData: PropTypes.func,
  walletBalanceResponse: PropTypes.func,
  errorMessage: PropTypes.func,
  checkApplicantResponseIsLoading: PropTypes.bool,
};

TransactionList.defaultProps = {
  navigation: {},
  checkApplicantRequest: () => { },
  checkApplicantResponse: () => { },
  resetCheckApplicantData: () => { },
  errorMessage: () => { },
  walletBalanceResponse: () => { },
  checkApplicantResponseIsLoading: false,
};

const mapStateToProps = (state) => ({
  isLoading: state.getTransactionsReducer.isLoading,
  getTransactionsResponse: state.getTransactionsReducer.getTransactionsResponse,
  dashboard: state.dashboardReducer,
  profileResponse: state.getProfileDataReducer.profileResponse,
});

const mapDispatchToProps = () => UserActions;

const TransactionListScreen = connect(mapStateToProps, mapDispatchToProps)(TransactionList);

export default TransactionListScreen;
