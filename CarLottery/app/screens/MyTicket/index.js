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

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
    height: responsiveSize(32),
    width: responsiveSize(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    height: responsiveSize(32),
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
});


// eslint-disable-next-line react/prefer-stateless-function
class MyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      multiSliderValue: [0, 100],
      // Showlottery: images.uncheckedIconRadio,
      is_Live_Radio_check: false,
      is_All_Radio_check: false,
      is_Complete_Radio_check: false,
    };
  }

  // Show_hot_Lottery = () => {
  //   const { Showlottery, is_Radio_check } = this.state;
  //   if (is_Radio_check === false) {
  //     this.setState({
  //       Showlottery: images.checkedIconRadio,
  //       is_Radio_check: true,
  //     });
  //   } else {
  //     this.setState({
  //       Showlottery: images.uncheckedIconRadio,
  //       is_Radio_check: false,
  //     });
  //   }
  // };
  componentDidMount() {
    this.props.myTicketsFilterRequest({ status: 'all' });
  }

  onChangeText(text) {
    this.setState({ searchValue: text });
  }

  onPressAllRadiobtn() {
    this.setState({ is_All_Radio_check: !this.state.is_All_Radio_check });
  }

  onPressLiveRadiobtn() {
    this.setState({ is_Live_Radio_check: !this.state.is_Live_Radio_check });
  }

  onPressCompleteRadiobtn() {
    this.setState({ is_Complete_Radio_check: !this.state.is_Complete_Radio_check });
  }

  searchText() {
    // this.refreshlist();
  }

  multiSliderValuesChange(e) {
    this.setState({ multiSliderValue: e });
  }

  multiSliderValuesChangeFinish() {
    // this.refreshlist();
  }

  render() {
    const {
      is_All_Radio_check, is_Complete_Radio_check, is_Live_Radio_check, multiSliderValue,
    } = this.state;
    const { dashboard } = this.props;
    const { myLotteries } = dashboard;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          showRightImageIcon
          rightImageIcon={images.user}
          onPressRightIcon={() => this.props.logoutRequest()}
        />
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
              min={0}
              max={1}
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
                  <Image style={styles.radiobtnIcon} source={is_All_Radio_check ? images.statusSelectRadioIcon : images.statusUnselectRadioIcon} />
                </TouchableOpacity>
              </View>
              <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Text style={styles.radiobtnTxt}>{Localization.myTicketScreen.Live}</Text>
                <TouchableOpacity onPress={() => this.onPressLiveRadiobtn()}>
                  <Image style={styles.radiobtnIcon} source={is_Live_Radio_check ? images.statusSelectRadioIcon : images.statusUnselectRadioIcon} />
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center',
              }}
              >
                <Text style={styles.radiobtnTxt}>{Localization.myTicketScreen.Complete}</Text>
                <TouchableOpacity onPress={() => this.onPressCompleteRadiobtn()}>
                  <Image style={styles.radiobtnIcon} source={is_Complete_Radio_check ? images.statusSelectRadioIcon : images.statusUnselectRadioIcon} />
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
            // onEndReached={() => props.handleLoadMore()}
              onEndThreshold={0.1}
              refreshControl={(
                <RefreshControl
                  refreshing={false}
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
                  />
                );
              }}
            />
          )
            : (<BackgroundMessage title="No data available" />)}
        </View>
      </SafeAreaView>
    );
  }
}

MyTicket.propTypes = {
  myTicketsFilterRequest: PropTypes.func,
  dashboard: PropTypes.object,
  // lobbyFilterRequest: PropTypes.func,
};

MyTicket.defaultProps = {
  myTicketsFilterRequest: () => {},
  // lobbyFilterRequest: () => {},
  dashboard: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
});

const mapDispatchToProps = () => UserActions;

const myticketScreen = connect(mapStateToProps, mapDispatchToProps)(MyTicket);

export default myticketScreen;
