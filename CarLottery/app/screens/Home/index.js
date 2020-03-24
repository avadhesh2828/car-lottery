/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, FlatList, RefreshControl, Dimensions, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import NavigationHeader from '../../components/NavigationHeader';
import { spacing, UIColors } from '../../utils/variables';
import { formateData } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import LotteryCell from './components/LotteryCell';
import { contestImgUrl } from '../../api/urls';
import { screenNames } from '../../utils/constant';
import PopUpScreen from '../../components/PopupScreen';
import { UserData } from '../../utils/global';
import HeaderAd from '../../components/HeaderAd';

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
      isPopupVisible: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getHotLotteriesRequest();
    this.props.getHeaderAdRequest({});
    this.props.getFooterAdRequest({});
    this.props.getProfileRequest();
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  onPressPrizeModel(item) {
    Navigation.sharedInstance().pushToScreen(screenNames.MY_TICKET_PRIZE_MODEL_SCREEN, { item });
  }

  onRefreshLotteries() {
    this.props.getHotLotteriesRequest();
  }

  buyLottery(item) {
    this.props.joinLotteryRequest(item.contest_unique_id);
  }

  render() {
    const { isPopupVisible } = this.state;
    const { dashboard } = this.props;
    const { hotLotteries } = dashboard;
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
              onRefresh={() => this.onRefreshLotteries()}
            />
          )}
        >
          <HeaderAd adData={dashboard.headerAd} />
          <View style={styles.listView}>
            {hotLotteries.length !== 0 ? (
              <FlatList
                key="v"
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                data={formateData(hotLotteries, 2)}
                numColumns={2}
                // onEndReached={() => props.handleLoadMore()}
                onEndThreshold={0.1}
                renderItem={(item) => {
                  if (_.isEmpty(item.item)) {
                    return <View style={styles.blankContainer} />;
                  }
                  return (
                    <LotteryCell
                      item={item.item}
                      contestImgUrl={contestImgUrl}
                      buyLottery={(item) => this.buyLottery(item)}
                      onPressPrizeModel={() => this.onPressPrizeModel(item)}
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

Home.propTypes = {
  getHotLotteriesRequest: PropTypes.func,
  dashboard: PropTypes.object,
  logoutRequest: PropTypes.func,
};

Home.defaultProps = {
  getHotLotteriesRequest: () => { },
  dashboard: {},
  logoutRequest: () => {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  profileResponse: state.getProfileDataReducer.profileResponse,
});

const mapDispatchToProps = () => UserActions;

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeScreen;
