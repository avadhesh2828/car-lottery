/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import HeaderContainer from './components/HeaderContainer';
import TicketsTable from './components/TicketsTable';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import { screenNames } from '../../utils/constant';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.appBackGroundColor,
  },
});


// eslint-disable-next-line react/prefer-stateless-function
class MyTicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      isPopupVisible: false,
    };
  }

  componentDidMount() {
    const { item } = this.props.navigation.state.params;
    this.props.myTicketsContestDetailsRequest({
      items_perpage: 12,
      current_page: 1,
      sort_field: '',
      sort_order: '',
      keyword: '',
      contest_unique_id: item.contest_unique_id,
    });
    this.props.getUserContestDetailsRequest({ contest_unique_id: item.contest_unique_id });
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  onPressPrintBtn(item) {
    this.props.printTicketsRequest({
      contest_unique_id: item.contest_unique_id,
      teckits_numbers: [],
    });
  }

  onChangeText(text) {
    this.setState({ searchValue: text });
  }

  buyLottery(item) {
    this.props.joinLotteryRequest(item.contest_unique_id);
  }

  searchText() {
    this.refreshMyTickets();
  }

  onPressPrizeModel(item) {
    item.item = item;
    Navigation.sharedInstance().pushToScreen(screenNames.MY_TICKET_PRIZE_MODEL_SCREEN, { item });
  }

  refreshMyTickets() {
    const { item } = this.props.navigation.state.params;
    this.props.myTicketsContestDetailsRequest({
      items_perpage: 12,
      current_page: 1,
      sort_field: '',
      sort_order: '',
      keyword: this.state.searchValue,
      contest_unique_id: item.contest_unique_id,
    });
  }

  render() {
    const { isPopupVisible, searchValue } = this.state;
    const { dashboard } = this.props;
    const { selectedContestDetails, myContestTickets } = dashboard;
    const { item } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
          showBackButton
        />
        <HeaderContainer
          item={item}
          searchValue={searchValue}
          selectedContestDetails={selectedContestDetails}
          onPressPrizeModel={(item) => this.onPressPrizeModel(item)}
          searchText={() => this.searchText()}
          onChangeText={(text) => this.onChangeText(text)}
          buyLottery={(item) => this.buyLottery(item)}
        />
        <TicketsTable
          myContestTickets={myContestTickets}
        />
        {
      UserData.SessionKey && isPopupVisible
        ? (
          <PopUpScreen
            logoutAction={() => this.props.logoutRequest()}
          />
        )
        : null
  }
      </SafeAreaView>
    );
  }
}

MyTicketDetail.propTypes = {
  myTicketsContestDetailsRequest: PropTypes.func,
  getUserContestDetailsRequest: PropTypes.func,
  logoutRequest: PropTypes.func,
  dashboard: PropTypes.object,
};

MyTicketDetail.defaultProps = {
  myTicketsContestDetailsRequest: () => {},
  logoutRequest: () => {},
  getUserContestDetailsRequest: () => {},
  dashboard: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
});

const mapDispatchToProps = () => UserActions;

const MyTicketDetailScreen = connect(mapStateToProps, mapDispatchToProps)(MyTicketDetail);

export default MyTicketDetailScreen;
