/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, RefreshControl, TextInput, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { formateData, responsiveSize } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import LotteryCell from './components/LotteryCell';
import { contestImgUrl } from '../../api/urls';
import CustomLabel from './CustomLabel';
import { screenNames } from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  listView: {
    marginHorizontal: spacing.extraSmall,
    marginBottom: 150,
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
    marginHorizontal: spacing.small,
    resizeMode: 'cover',
  },
  radiobtnTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.tiny,
  },
  sliderTxt1: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  sliderTxt2: {
    flex: 1,
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
      multiSliderValue: [0, 100],
    };
  }

  componentDidMount() {
    this.runApis();
    // this.props.lobbyFilterRequest();
  }


  // componentDidUpdate(prevProps) {
  //   if ((this.state.multiSliderValue[0] !== this.props.dashboard.minEntryFee)
  //   || (this.state.multiSliderValue[0] !== this.props.dashboard.maxEntryFee)) {
  //     this.setState({ multiSliderValue: [this.props.dashboard.myTicketMinEntryFee, this.props.dashboard.myTicketMaxEntryFee] });
  //   }
  // }

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
    this.setState({ searchValue: text });
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

  render() {
    const { dashboard } = this.props;
    const { multiSliderValue } = this.state;
    const { lobbyHotLotteries } = dashboard;
    return (
      <View style={styles.mainContainer}>
        <NavigationHeader />
        <View style={styles.subContainer}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.sliderTxt1}>{multiSliderValue[0]}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
              // onEndReached={this.handleLoadMoreLottery}
              onEndThreshold={0.5}
              refreshControl={(
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => this.refreshlist()}
                />
            )}
              renderItem={(item) => {
                if (_.isEmpty(item.item)) {
                  return <View style={styles.blankContainer} />;
                }
                return (
                  <LotteryCell
                    item={item.item}
                    contestImgUrl={contestImgUrl}
                    onPressPrizeModel={() => this.onPressPrizeModel(item)}
                  />
                );
              }}
              // renderItem={(item) => (
              //   <LotteryCell
              //     item={item.item}
              //   />
              // )}
            />
          )
            : (<BackgroundMessage title="No data available" />)}
        </View>
      </View>
    );
  }
}

Lobby.propTypes = {
  getLobbyHotLotteriesRequest: PropTypes.func,
  dashboard: PropTypes.object,
  lobbyFilterRequest: PropTypes.func,
};

Lobby.defaultProps = {
  getLobbyHotLotteriesRequest: () => {},
  lobbyFilterRequest: () => {},
  dashboard: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
});

const mapDispatchToProps = () => UserActions;

const lobbyScreen = connect(mapStateToProps, mapDispatchToProps)(Lobby);

export default lobbyScreen;
