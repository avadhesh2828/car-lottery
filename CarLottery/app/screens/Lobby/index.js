/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, RefreshControl, TextInput, Dimensions, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { formateData, responsiveSize, isEmpty } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import LotteryCell from './components/LotteryCell';
import { contestImgUrl } from '../../api/urls';
import CustomLabel from './CustomLabel';
import { screenNames, InputKey } from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';
import PopUpScreen from '../../components/PopupScreen';
import { UserData } from '../../utils/global';
import HeaderAd from '../../components/HeaderAd';
import { Localization } from '../../utils/localization';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  listView: {
    marginHorizontal: spacing.extraSmall,
  },
  seperator: {
    flex: 2,
    height: spacing.small,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  blankContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width - 10) / 2,
    margin: spacing.extraSmall,
  },
  subContainer: {
    flexDirection: 'column',
    marginTop: spacing.mediumLarge,
    marginBottom: spacing.mediumLarge,
  },
  SearchContainer: {
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    marginLeft: spacing.extraLarge,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginEnd: spacing.extraSmall,
  },
  searchIconStyle: {
    width: itemSizes.iconExtraSmall,
    height: itemSizes.iconExtraSmall,
    tintColor: UIColors.appBackGroundColor,
  },
  searchButton: {
    backgroundColor: UIColors.purpleButtonColor,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    width: responsiveSize(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    color: UIColors.textTitle,
    borderColor: 'gray',
    borderWidth: 1,
    padding: spacing.small,
  },
  filter_label_label: {
    marginLeft: spacing.large,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',

  },
  radiobtnIcon: {
    width: itemSizes.iconSmall,
    height: itemSizes.iconSmall,
    marginHorizontal: spacing.small,
    resizeMode: 'cover',
  },
  radiobtnTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.tiny,
  },
  sliderTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  ticketPriceTxt: {
    textAlign: 'center',
    marginBottom: spacing.medium,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


// eslint-disable-next-line react/prefer-stateless-function
class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      is_Radio_check: false,
      multiSliderValue: [0.2, 99.8],
      isPopupVisible: false,
    };
  }

  componentDidMount() {
    this.runApis();
    // this.props.lobbyFilterRequest();
  }

  static getDerivedStateFromProps(props, current_state) {
    if ((props.dashboard.minEntryFee !== 0 && props.dashboard.maxEntryFee !== 10000
      && (current_state.multiSliderValue[0] === 0.2 && current_state.multiSliderValue[1] === 99.8))) {
      return {
        multiSliderValue: [props.dashboard.minEntryFee, props.dashboard.maxEntryFee],
      };
    }
    return null;
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  runApis() {
    this.props.lobbyFilterRequest();
  }

  refreshlist() {
    this.props.getLobbyHotLotteriesRequest({
      items_perpage: 10,
      current_page: 1,
      sort_field: '',
      sort_order: '',
      keyword: this.state.searchValue,
      minEntryFee: this.state.multiSliderValue[0],
      maxEntryFee: this.state.multiSliderValue[1],
      only_hot_lotteries: this.state.is_Radio_check,
    });
  }

  handleLoadMoreLottery = () => {
    // console.log('cureentpage',)
    console.log('...calling');
    // alert('aaya');
    if (this.props.dashboard.currentLobbyPage <= this.props.dashboard.lobbyListTotalPages && !this.props.dashboard.isLoadingLobbyLottery) {
      this.props.getLobbyHotLotteriesRequest({
        items_perpage: 10,
        current_page: this.props.dashboard.currentLobbyPage + 1,
        sort_field: '',
        sort_order: '',
        keyword: this.state.searchValue,
        minEntryFee: this.state.multiSliderValue[0],
        maxEntryFee: this.state.multiSliderValue[1],
        only_hot_lotteries: false,
      });
    //   // this.current_page += 1;
    }
    // current_page
  }

  Show_hot_Lottery = () => {
    const { Showlottery, is_Radio_check } = this.state;
    this.props.getLobbyHotLotteriesRequest({
      items_perpage: 10,
      current_page: 1,
      sort_field: '',
      sort_order: '',
      keyword: this.state.searchValue,
      minEntryFee: this.state.multiSliderValue[0],
      maxEntryFee: this.state.multiSliderValue[1],
      only_hot_lotteries: !this.state.is_Radio_check,
    });
    if (is_Radio_check === false) {
      this.setState({
        Showlottery: images.checkedIconRadio,
        is_Radio_check: true,
      });
    } else {
      this.setState({
        Showlottery: images.uncheckedIconRadio,
        is_Radio_check: false,
      });
    }
  };

  onChangeText(text) {
    if (!(_.isEmpty(text))) {
      this.setState({ searchValue: text });
      this.refreshlist();
    } else {
      this.setState({ searchValue: text });
      this.props.getLobbyHotLotteriesRequest({
        items_perpage: 10,
        current_page: 1,
        sort_field: '',
        sort_order: '',
        only_hot_lotteries: false,
      });
    }
  }

  searchText() {
    this.refreshlist();
  }

  multiSliderValuesChange(e) {
    this.setState({ multiSliderValue: e });
  }

  multiSliderValuesChangeFinish() {
    this.refreshlist();
  }

  onPressPrizeModel(item) {
    Navigation.sharedInstance().pushToScreen(screenNames.MY_TICKET_PRIZE_MODEL_SCREEN, { item });
  }

  buyLottery(item) {
    this.props.joinLotteryRequest(item.contest_unique_id);
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.searchValue:
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(' error: ', error);
    }
  }

  getTextInputReference(key, reference) {
    switch (key) {
      case InputKey.searchValue:
        this.searchValueInput = reference;
        break;
      default:
        break;
    }
  }

  render() {
    const { dashboard } = this.props;
    const { multiSliderValue, isPopupVisible } = this.state;
    const { lobbyHotLotteries } = dashboard;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
        />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={false}
              onRefresh={() => this.refreshlist()}
            />
          )}
        >
          <HeaderAd adData={dashboard.headerAd} />
          <View style={styles.subContainer}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 5, marginLeft: spacing.large }}>
                  <Text style={styles.sliderTxt}>
                    {' '}
                    ₦
                    {multiSliderValue[0]}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sliderTxt}>
                    {' '}
                    ₦
                    {multiSliderValue[1]}
                  </Text>
                </View>
              </View>
              <View style={styles.sliderContainer}>
                <MultiSlider
                  selectedStyle={{
                    height: spacing.semiMedium,
                    backgroundColor: 'green',
                  }}
                  unselectedStyle={{
                    borderRadius: 12,
                    height: spacing.semiMedium,
                    backgroundColor: 'gray',
                  }}
                  markerStyle={{
                    marginTop: spacing.semiMedium,
                    height: spacing.extraLarge,
                    width: spacing.extraLarge,
                    backgroundColor: UIColors.purpleButtonColor,
                  }}
                  touchDimensions={{
                    height: spacing.extraLarge,
                    width: spacing.extraLarge,
                  }}
                  values={[multiSliderValue[0], multiSliderValue[1]]}
                  onValuesChange={(e) => this.multiSliderValuesChange(e)}
                  onValuesChangeFinish={() => this.multiSliderValuesChangeFinish()}
                  sliderLength={Dimensions.get('window').width - 80}
                  min={this.props.dashboard.minEntryFee}
                  max={this.props.dashboard.maxEntryFee}
                  step={1}
                  allowOverlap
                  snapped
                  enabledTwo
                  customLabel={CustomLabel}
                />
              </View>
              <Text style={styles.ticketPriceTxt}>
                {Localization.myTicketDetailsScreen.TicketPrice}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.SearchContainer}>
                <TextInput
                  underlineColorAndroid={'transparent'}
                  style={styles.textInputStyle}
                  placeholder={'Search by Lottery name'}
                  placeholderTextColor={UIColors.grayText}
                  onChangeText={(text)=> this.onChangeText(text)}
                  clearButtonMode={'always'}
                  value={this.state.searchValue}
                />
                <TouchableOpacity style={styles.searchButton} onPress={()=> this.searchText()}>
                  <Image style={styles.searchIconStyle} source={images.searchIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', marginLeft: spacing.small, flexDirection: 'row' }}>
                <Text style={styles.radiobtnTxt}>
                  {'Show only\nhot lottery'}
                </Text>
                {/* <Text style={styles.radiobtnTxt}>
                hot lottery
              </Text> */}
              </View>
              <View style={{ alignItems: 'center', marginTop: spacing.small, flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.Show_hot_Lottery}>
                  <Image style={styles.radiobtnIcon} source={!this.state.is_Radio_check ? images.uncheckedIconRadio : images.checkedIconRadio} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            { lobbyHotLotteries.length !== 0 ? (
              <FlatList
                key="v"
                extraData={this.props}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                data={formateData([...lobbyHotLotteries], 2)}
                numColumns={2}
                onEndReached={this.handleLoadMoreLottery}
                onEndThreshold={0.5}
              //   refreshControl={(
              //     <RefreshControl
              //       refreshing={false}
              //       onRefresh={() => this.refreshlist()}
              //     />
              // )}
                renderItem={(item) => {
                  if (_.isEmpty(item.item)) {
                    return <View style={styles.blankContainer} />;
                  }
                  return (
                    <LotteryCell
                      item={item.item}
                      contestImgUrl={contestImgUrl}
                      onPressPrizeModel={() => this.onPressPrizeModel(item)}
                      buyLottery={(item) => this.buyLottery(item)}
                    />
                  );
                }}
              />
            )
              : (<BackgroundMessage title="No data available" />)}
          </View>
          <HeaderAd adData={dashboard.footerAd} />
        </ScrollView>
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

Lobby.propTypes = {
  getLobbyHotLotteriesRequest: PropTypes.func,
  dashboard: PropTypes.object,
  lobbyFilterRequest: PropTypes.func,
  logoutRequest: PropTypes.func,
};

Lobby.defaultProps = {
  getLobbyHotLotteriesRequest: () => {},
  lobbyFilterRequest: () => {},
  dashboard: {},
  logoutRequest: () => {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  profileResponse: state.getProfileDataReducer.profileResponse,
});

const mapDispatchToProps = () => UserActions;

const lobbyScreen = connect(mapStateToProps, mapDispatchToProps)(Lobby);

export default lobbyScreen;
