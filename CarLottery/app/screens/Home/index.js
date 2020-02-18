import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { formateData } from '../../utils/utils';
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
class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader />
        <View style={styles.listView}>
          { hotLotteries.length !== 0 ? (
            <FlatList
              key="v"
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              data={formateData(hotLotteries, 2)}
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = () => UserActions;

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeScreen;
