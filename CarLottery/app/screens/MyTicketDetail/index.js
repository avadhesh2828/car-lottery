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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.appBackGroundColor,
  },
});

const ticketList = [
  {
    ticket_number: '91 61 96 44 53 20 88 00',
    created_date: '2020-02-14 10:13:21+00',
    user_won: null,
  },
  {
    ticket_number: '29 23 62 77 23 92 34 98',
    created_date: '2020-02-14 10:12:57+00',
    user_won: null,
  },
  {
    ticket_number: '20 14 26 55 60 47 01 32',
    created_date: '2020-02-12 05:06:07+00',
    user_won: null,
  },
  {
    ticket_number: '46 24 64 65 97 50 63 79',
    created_date: '2020-02-11 08:15:52+00',
    user_won: null,
  },
  {
    ticket_number: '19 89 22 06 97 67 96 93',
    created_date: '2020-02-10 10:53:41+00',
    user_won: null,
  },
  {
    ticket_number: '90 06 92 96 52 13 22 54',
    created_date: '2020-02-10 10:53:29+00',
    user_won: null,
  },
  {
    ticket_number: '97 16 27 17 51 11 79 81',
    created_date: '2020-02-07 06:40:54+00',
    user_won: null,
  },
  {
    ticket_number: '89 18 77 83 12 46 59 38',
    created_date: '2020-02-06 05:23:23+00',
    user_won: null,
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class MyTicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { isPopupVisible } = this.state;
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
          selectedContestDetails={selectedContestDetails}
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
