/* eslint-disable no-sequences */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, RefreshControl, TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import UserActions from '../../actions';
// import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { formateData, responsiveSize } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import LotteryCell from './components/LotteryCell';

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
  subContainer: {
    flexDirection: 'row',
    marginTop: spacing.mediumLarge,
    marginBottom: spacing.mediumLarge,
  },
  SearchContainer: {
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
    width: itemSizes.iconLarge,
    height: itemSizes.iconLarge,
    marginHorizontal: spacing.medium,
    resizeMode: 'cover',
  },
  radiobtnTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.tiny,
  },
});

const hotLotteries = [
  {
    contest_unique_id: 't9XKeRJju',
    contest_name: 'Play & Win New S presso',
    start_date_time: '2020-01-21 05:00:00+00',
    status: '1',
    modified_date: '2020-02-14 10:54:27+00',
    entry_fee: '9',
    jackpot_prize: 'Car Galaxy',
    jackpot_prize_image: '5e2ac0b99626a761642136',
    consolation_prizes: '{"2": "lenovo computer"}',
    fill_percent: '56.0000000000000000',
  },
  {
    contest_unique_id: 't9XKeRKju',
    contest_name: 'Play & Win New Audi',
    start_date_time: '2020-01-21 05:00:00+00',
    status: '1',
    modified_date: '2020-02-15 10:54:27+00',
    entry_fee: '12',
    jackpot_prize: 'Won Audi',
    jackpot_prize_image: '5e2ac0b99626a761642136',
    consolation_prizes: '{"2": "lenovo computer"}',
    fill_percent: '60.0000000000000000',
  },
];


// eslint-disable-next-line react/prefer-stateless-function
class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      Showlottery: images.uncheckedIconRadio,
      is_Radio_check: 'false',
    };
  }

  Show_hot_Lottery = () => {
    const { Showlottery, is_Radio_check } = this.state;
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


  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader />
        <View style={styles.subContainer}>
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
            <TouchableOpacity style={styles.searchButton}>
              <Image style={styles.searchIconStyle} source={images.searchIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: spacing.semiMedium }}>
            <Text style={styles.radiobtnTxt}>
              {'Show only\nhot lottery'}
            </Text>
            {/* <Text style={styles.radiobtnTxt}>
              hot lottery
            </Text> */}
          </View>
          <View style={{ margin: spacing.semiMedium }}>
            <TouchableOpacity onPress={this.Show_hot_Lottery}>
              <Image style={styles.radiobtnIcon} source={this.state.Showlottery} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listView}>
          { hotLotteries.length !== 0 ? (
            <FlatList
              key="v"
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              data={formateData(hotLotteries, 6)}
              numColumns={2}
            // onEndReached={() => props.handleLoadMore()}
              onEndThreshold={0.1}
              refreshControl={(
                <RefreshControl
                  refreshing={false}
                />
            )}
              renderItem={(item) => (
                <LotteryCell
                  item={item.item}
                />
              )}
            />
          )
            : (<BackgroundMessage title="No data available" />)}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => UserActions;

const lobbyScreen = connect(mapStateToProps, mapDispatchToProps)(Lobby);

export default lobbyScreen;
