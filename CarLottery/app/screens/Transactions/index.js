import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import Navigation from '../../utils/navigation';
// import Header from './components/Header';
import { images } from '../../assets/images';
// import AccountContainer from './components/containers/AccountContainer';
import { UIColors } from '../../utils/variables';

import { screenNames } from '../../utils/constant';
import TransactionContainer from './components/TransactionContainer';
import NavigationHeader from '../../components/NavigationHeader';
// import TransactionContainer from '../Account copy/components/containers/TransactionContainer';
// import TransactionContainer from '../Account copy/components/containers/TransactionContainer';

const initialData = [{ amount: 'Amount', key:0, created_date: 'Date', description: 'Description', is_processed: 'Status' }];

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getTransactionsRequest();
  }

  componentWillUnmount() {
  }

  onTransactionListClicked() {
    // Navigation.sharedInstance().pushToScreen(SCREENS.TRANSACTION_LIST, {});
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: UIColors.primary }}>

        <NavigationHeader
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
        />
        {/* Main Account Container */}
        <TransactionContainer paymentsList={this.props.getTransactionsResponse.result} onTransactionListClicked={() => this.onTransactionListClicked()} />
        {this.props.isLoading
          && <Loader isAnimating={this.props.isLoading} />}
      </View>
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

const mapStateToProps = state => ({
  isLoading: state.getTransactionsReducer.isLoading,
  getTransactionsResponse: state.getTransactionsReducer.getTransactionsResponse,
});

const mapDispatchToProps = () => UserActions;

const TransactionListScreen = connect(mapStateToProps, mapDispatchToProps)(TransactionList);

export default TransactionListScreen;
