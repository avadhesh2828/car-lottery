/* eslint-disable no-sequences */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, RefreshControl, TextInput, Dimensions, Modal,
} from 'react-native';
import { connect } from 'react-redux';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import CustomLabel from './CustomLabel';
// import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { formateData, responsiveSize } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import LotteryCell from './components/LotteryCell';
import { contestImgUrl } from '../../api/urls';
import { Localization } from '../../utils/localization';
import { screenNames } from '../../utils/constant';
import Navigation from '../../utils/navigation';
import { isIOS } from '../../utils/plateformSpecific';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import HeaderAd from '../../components/HeaderAd';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  blankContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width - 10) / 2,
    margin: spacing.extraSmall,
  },
  listView: {
    marginHorizontal: spacing.extraSmall,
  },
  seperator: {
    flex: 2,
    height: spacing.small,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  subContainer: {
    // flexDirection: 'row',
    marginTop: spacing.mediumLarge,
    marginBottom: spacing.mediumLarge,
  },
  SearchContainer: {
    marginLeft: spacing.extraLarge,
    flex: 1.2,
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
    paddingLeft: spacing.semiMedium,
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
    resizeMode: 'cover',
  },
  radiobtnTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraExtraSmall,
    marginBottom: spacing.extraExtraSmall,
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderTxt1: {
    color: UIColors.textTitle,
    marginHorizontal: spacing.extraLarge,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  sliderTxt2: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  modalcontainer: {
    position: 'absolute',
    top: itemSizes.navLogoImageHeight,
    marginTop: itemSizes.navLogoImageHeight,
    right: 4,
    height: itemSizes.defaultHeight,
    width: '30%',
    backgroundColor: UIColors.purpleButtonColor,
  },
  NavHeaderTxt: {
    marginTop: spacing.semiMedium,
    alignSelf: 'center',
    color: UIColors.appBackGroundColor,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
});


// eslint-disable-next-line react/prefer-stateless-function
class MyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      multiSliderValue: [0.2, 99.8],
      isVisible: false,
      isPopupVisible: false,
      // Showlottery: images.uncheckedIconRadio,
      radioStatusValue: 'all',
    };
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  componentDidMount() {
    this.props.myTicketsFilterRequest({ status: 'all' });
  }

  static getDerivedStateFromProps(props, current_state) {
    if ((props.dashboard.myTicketMinEntryFee !== 0 && props.dashboard.myTicketMaxEntryFee !== 10000
      && (current_state.multiSliderValue[0] === 0.2 && current_state.multiSliderValue[1] === 99.8))) {
      return {
        multiSliderValue: [props.dashboard.myTicketMinEntryFee, props.dashboard.myTicketMaxEntryFee],
      };
    }
    return null;
  }

  onChangeText(text) {
    this.setState({ searchValue: text });
  }

  onPressAllRadiobtn() {
    if (this.state.radioStatusValue !== 'all') {
      this.setState({
        radioStatusValue: 'all',
      });
      this.onStatusChange('all');
    }
  }

  onPressLiveRadiobtn() {
    if (this.state.radioStatusValue !== 'live') {
      this.setState({
        radioStatusValue: 'live',
      });
      this.onStatusChange('live');
    }
  }

  onPressCompleteRadiobtn() {
    if (this.state.radioStatusValue !== 'completed') {
      this.setState({
        radioStatusValue: 'completed',
      });
      this.onStatusChange('completed');
    }
  }

  onStatusChange(statusValue) {
    this.props.getMyLotteriesRequest({
      items_perpage: 10,
      current_page: 1,
      sort_field: 'C.status',
      sort_order: 'ASC',
      status: statusValue,
      keyword: this.state.searchValue,
      minEntryFee: this.state.multiSliderValue[0],
      maxEntryFee: this.state.multiSliderValue[1],
      only_hot_lotteries: true,
    });
  }

  searchText() {
    this.refreshMyLotteries();
  }

  multiSliderValuesChange(e) {
    this.setState({ multiSliderValue: e });
  }

  multiSliderValuesChangeFinish() {
    this.refreshMyLotteries();
  }

  refreshMyLotteries() {
    this.props.getMyLotteriesRequest({
      items_perpage: 10,
      current_page: 1,
      sort_field: 'C.status',
      sort_order: 'ASC',
      status: this.state.radioStatusValue,
      keyword: this.state.searchValue,
      minEntryFee: this.state.multiSliderValue[0],
      maxEntryFee: this.state.multiSliderValue[1],
      only_hot_lotteries: true,
    });
  }

  handleLoadMoreLottery = () => {
    // console.log('...calling1');
    if (this.props.dashboard.currentMyTicketsPage <= this.props.dashboard.myTicketsTotalPages && !this.props.dashboard.isLoadingMyTickets) {
      this.props.getMyLotteriesRequest({
        items_perpage: 10,
        current_page: this.props.dashboard.currentMyTicketsPage + 1,
        sort_field: 'C.status',
        sort_order: 'ASC',
        keyword: this.state.searchValue,
        minEntryFee: this.state.multiSliderValue[0],
        maxEntryFee: this.state.multiSliderValue[1],
        only_hot_lotteries: true,
        status: this.state.radioStatusValue,
      });
    }
  }

  onPressPrizeModel(item) {
    Navigation.sharedInstance().pushToScreen(screenNames.MY_TICKET_PRIZE_MODEL_SCREEN, { item });
  }

  render() {
    const {
      multiSliderValue, radioStatusValue, isVisible, isPopupVisible,
    } = this.state;
    const { dashboard } = this.props;
    const { myLotteries } = dashboard;
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
              onRefresh={() => this.refreshMyLotteries()}
            />
          )}
        >
          <HeaderAd adData={dashboard.headerAd} />
          <View style={styles.subContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 6 }}>
                <Text style={styles.sliderTxt1}>{multiSliderValue[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sliderTxt2}>{multiSliderValue[1]}</Text>
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
                min={dashboard.myTicketMinEntryFee}
                max={(dashboard.myTicketMaxEntryFee === dashboard.myTicketMinEntryFee) ? dashboard.myTicketMinEntryFee + 1 : dashboard.myTicketMaxEntryFee}
                step={1}
                allowOverlap
                snapped
                enabledTwo
                customLabel={CustomLabel}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center',
                }}
                >
                  <Text style={styles.radiobtnTxt}>{Localization.myTicketScreen.All}</Text>
                  <TouchableOpacity onPress={() => this.onPressAllRadiobtn()}>
                    <Image style={styles.radiobtnIcon} source={radioStatusValue === 'all' ? images.statusSelectRadioIcon : images.statusUnselectRadioIcon} />
                  </TouchableOpacity>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center',
                }}
                >
                  <Text style={styles.radiobtnTxt}>{Localization.myTicketScreen.Live}</Text>
                  <TouchableOpacity onPress={() => this.onPressLiveRadiobtn()}>
                    <Image style={styles.radiobtnIcon} source={radioStatusValue === 'live' ? images.statusSelectRadioIcon : images.statusUnselectRadioIcon} />
                  </TouchableOpacity>
                </View>
                <View style={{
                  flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center',
                }}
                >
                  <Text style={styles.radiobtnTxt}>{Localization.myTicketScreen.Complete}</Text>
                  <TouchableOpacity onPress={() => this.onPressCompleteRadiobtn()}>
                    <Image style={styles.radiobtnIcon} source={radioStatusValue === 'completed' ? images.statusSelectRadioIcon : images.statusUnselectRadioIcon} />
                  </TouchableOpacity>
                </View>
              </View>
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
            </View>
          </View>
          <View style={styles.listView}>
            { myLotteries.length !== 0 ? (
              <FlatList
                key="v"
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                data={formateData(myLotteries, 2)}
                numColumns={2}
              // onEndReached={() => this.handleLoadMoreLottery()}
                onEndThreshold={0.1}
            //     refreshControl={(
            //       <RefreshControl
            //         refreshing={false}
            //         onRefresh={() => this.refreshMyLotteries()}
            //       />
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
                      onPressViewBtn={() => this.onPressViewBtn(item)}
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
                  logoutAction={() => this.props.logoutRequest()}
                />
              )
              : null
        }
      </SafeAreaView>
    );
  }
}

MyTicket.propTypes = {
  myTicketsFilterRequest: PropTypes.func,
  dashboard: PropTypes.object,
  logoutRequest: PropTypes.func,
  // lobbyFilterRequest: PropTypes.func,
  getMyLotteriesRequest: PropTypes.func,
};

MyTicket.defaultProps = {
  getMyLotteriesRequest: () => {},
  myTicketsFilterRequest: () => {},
  // lobbyFilterRequest: () => {},
  dashboard: {},
  logoutRequest: () => {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
});

const mapDispatchToProps = () => UserActions;

const myticketScreen = connect(mapStateToProps, mapDispatchToProps)(MyTicket);

export default myticketScreen;
