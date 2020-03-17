/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, RefreshControl, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { formateData, responsiveSize } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import PrizeModelCell from './components/PrizeModelCell';
import { contestImgUrl } from '../../api/urls';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.appBackGroundColor,
  },
  subContainer: {
    margin: spacing.medium,
  },
  carimage: {
    width: responsiveSize(150),
    height: responsiveSize(100),
  },
  lotteryNameText: {
    marginLeft: spacing.small,
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  jackpotPrizeText: {
    marginTop: spacing.medium,
    marginLeft: spacing.small,
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
  },
  Lotterytext: {
    margin: spacing.semiMedium,
    textAlign: 'center',
    fontSize: fontSizes.large,
    color: UIColors.purpleButtonColor,
    fontFamily: fontName.sourceSansProBold,
  },
  ticketNumbertext: {
    margin: spacing.semiMedium,
    fontSize: fontSizes.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',
    color: UIColors.purpleButtonColor,
    fontFamily: fontName.sourceSansProBold,
  },
  listView: {
    marginHorizontal: spacing.extraSmall,
  },
  seperator: {
    height: spacing.small,
  },
  blankContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width - 10) / 2,
    margin: spacing.extraSmall,
  },
  lotteryViewConatiner: {
    backgroundColor: UIColors.appBackGroundColor,
    flexDirection: 'row',
    margin: spacing.small,
  },
  LotterytextConatiner: {
    margin: spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  winnerStatusContainer: {
    borderRadius: spacing.smallHalf,
    marginLeft: spacing.small,
    height: itemSizes.extraSmallButtonHeight,
    width: responsiveSize(70),
    backgroundColor: UIColors.navigationBar,
  },
  winnerStatustext: {
    paddingLeft: spacing.medium,
    padding: spacing.small,
    fontSize: fontSizes.extraExtraSmall,
    color: UIColors.appBackGroundColor,
    fontFamily: fontName.sourceSansProBold,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class MyTicketPrizeModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
    };
  }

  getconsolationDetails(myLotteryItem, userWinnerTicket, contestWinners) {
    const consolationList = [];
    const consolationPrizeList = JSON.parse(myLotteryItem.consolation_prizes);
    if (myLotteryItem.status === '3' && !_.isEmpty(contestWinners)) {
      for (let i = 0; i <= contestWinners.length - 2; i++) {
        consolationList[i] = {
          consolation_prize: consolationPrizeList[i + 2],
          winner_ticket_number: contestWinners[i + 1].winner_ticket_number,
          winner_status: contestWinners[i + 1].winner_status,
          is_my_ticket: !!_.find(userWinnerTicket, { winner_ticket_number: contestWinners[i + 1].winner_ticket_number }),
        };
      }
    } else if (!_.isEmpty(myLotteryItem) && (Object.keys(consolationPrizeList).length) > 0) {
      for (let i = 0; i < Object.keys(consolationPrizeList).length; i++) {
        consolationList[i] = {
          consolation_prize: consolationPrizeList[i + 2],
        };
      }
    } else {
      return [];
    }
    return consolationList;
  }

  componentDidMount() {
    const { item } = this.props.navigation.state.params;
    if (item.item.status === '3') {
      this.props.getUserWinnerTicketsRequest({ contest_unique_id: item.item.contest_unique_id });
      this.props.getLotterieWinnersRequest({ contest_unique_id: item.item.contest_unique_id });
    }
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  render() {
    const { isPopupVisible } = this.state;
    const { dashboard } = this.props;
    const { userWinnerTickets, selectedLotterieWinnerslist } = dashboard;
    const { item } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          showBackButton
          showRightImageIcon
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
        />
        <View style={styles.subContainer}>
          <View style={styles.LotterytextConatiner}>
            <Text style={styles.lotteryNameText}>{item.item.contest_name}</Text>
            {
             item.item.status === '1'
               ? <Text style={styles.lotteryNameText}>{Localization.myPrizeModelScreen.live}</Text>
               : <Text style={styles.lotteryNameText}>{Localization.myPrizeModelScreen.complete}</Text>
            }
          </View>
          <View style={styles.lotteryViewConatiner}>
            <Image style={styles.carimage} source={{ uri: contestImgUrl(item.item.jackpot_prize_image) }} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={4} style={styles.jackpotPrizeText}>{item.item.jackpot_prize}</Text>
              {
             item.item.status === '3'
               ? (
                 <View>
                   { selectedLotterieWinnerslist[0]
            && <Text style={styles.ticketNumbertext}>{selectedLotterieWinnerslist[0].winner_ticket_number}</Text>}
                   {
          selectedLotterieWinnerslist[0] && userWinnerTickets[0]
          && parseInt(selectedLotterieWinnerslist[0].winner_status) === parseInt(userWinnerTickets[0].winner_type)
            ? (
              <View style={styles.winnerStatusContainer}>
                <Text style={styles.winnerStatustext}>
                  {
                      Localization.myPrizeModelScreen.youwon
                    }
                </Text>
                {
                }
              </View>
            ) : null
}
                 </View>
               )
               : null
              }
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          {
            item.item.consolation_prizes !== null
              ? (
                <FlatList
                  key="v"
                  keyExtractor={(item, index) => index.toString()}
                  extraData={this.props}
                  ItemSeparatorComponent={() => <View style={styles.seperator} />}
                  data={item.item ? this.getconsolationDetails(item.item, userWinnerTickets, selectedLotterieWinnerslist) : []}
            // onEndReached={() => props.handleLoadMore()}
                  onEndThreshold={0.1}
                  refreshControl={(
                    <RefreshControl
                      refreshing={false}
                    />
            )}
                  renderItem={(data) => {
                    if (_.isEmpty(data)) {
                      return <View style={styles.blankContainer} />;
                    }
                    return (
                      <PrizeModelCell
                        item={data}
                        contestImgUrl={contestImgUrl}
                      />
                    );
                  }}
                />
              )
              : null
          }
        </View>
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

MyTicketPrizeModel.propTypes = {
  getHotLotteriesRequest: PropTypes.func,
  getLotterieWinnersRequest: PropTypes.func,
  getUserWinnerTicketsRequest: PropTypes.func,
  dashboard: PropTypes.object,
  logoutRequest: PropTypes.func,
};

MyTicketPrizeModel.defaultProps = {
  getHotLotteriesRequest: () => {},
  getUserWinnerTicketsRequest: () => {},
  getLotterieWinnersRequest: () => {},
  dashboard: {},
  logoutRequest: () => {},
};

const mapStateToProps = (state) => ({

  dashboard: state.dashboardReducer,
});

const mapDispatchToProps = () => UserActions;

const MyTicketPrizeModelScreen = connect(mapStateToProps, mapDispatchToProps)(MyTicketPrizeModel);

export default MyTicketPrizeModelScreen;
