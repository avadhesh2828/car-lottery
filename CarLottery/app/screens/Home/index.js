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
  blankContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width - 10) / 2,
    margin: spacing.extraSmall,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getHotLotteriesRequest();
  }

  render() {
    const { dashboard } = this.props;
    const { hotLotteries } = dashboard;
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
              renderItem={(item) => {
                if (_.isEmpty(item.item)) {
                  return <View style={styles.blankContainer} />;
                }
                return (
                  <LotteryCell
                    item={item.item}
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

Home.propTypes = {
  getHotLotteriesRequest: PropTypes.func,
  dashboard: PropTypes.object,
};

Home.defaultProps = {
  getHotLotteriesRequest: () => {},
  dashboard: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
});

const mapDispatchToProps = () => UserActions;

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeScreen;
