/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, FlatList, RefreshControl, Dimensions, ScrollView, Image, Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontSizes, fontName,
} from '../../utils/variables';
import { formateData, responsiveSize } from '../../utils/utils';
import BackgroundMessage from '../../components/BackgroundMessage';
import LotteryCell from './components/LotteryCell';
import { contestImgUrl } from '../../api/urls';
import { screenNames } from '../../utils/constant';
import PopUpScreen from '../../components/PopupScreen';
import { UserData } from '../../utils/global';
import HeaderAd from '../../components/HeaderAd';
import SideMenu from '../../components/SideMenu';
import { images } from '../../assets/images';
import Banner from '../../components/Banner';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  carouselkmainContainer: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: UIColors.appBackGroundColor,
    margin: spacing.medium,
    borderRadius: spacing.medium,
  },
  carouselImage: {
    width: responsiveSize(70),
    height: responsiveSize(70),
  },
  carouselTitle: {
    margin: spacing.medium,
    fontSize: fontSizes.extraLarge,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    textAlign: 'center',
  },
  carouselSubTitle: {
    fontSize: fontSizes.extraLarge,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    paddingLeft: spacing.semiMedium,
    paddingRight: spacing.semiMedium,
  },
  carouseltext: {
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
    paddingLeft: spacing.semiMedium,
    paddingRight: spacing.semiMedium,
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
      isSideMenuVisible: false,
      Data: [
        {
          title: 'Feature 1',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
          image: images.feature1,
        },
        {
          title: 'Feature 2',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
          image: images.feature2,
        },
        {
          title: 'Feature 3',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
          image: images.feature3,
        },
      ],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getHotLotteriesRequest();
    this.props.getHeaderAdRequest({});
    this.props.getFooterAdRequest({});
    if (UserData.SessionKey) {
      this.props.getProfileRequest();
    }
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

  _renderItem({ item, index }) {
    return (
      <View style={styles.carouselkmainContainer}>
        <View style={{ flexDirection: 'row-reverse', paddingLeft: spacing.semiMedium }}>
          <Image source={item.image} style={styles.carouselImage} />
        </View>
        <Text style={styles.carouselSubTitle}>{ item.title }</Text>
        <Text numberOfLines={10} style={styles.carouseltext}>{item.subtitle}</Text>
      </View>
    );
  }

  render() {
    const { isPopupVisible, isSideMenuVisible } = this.state;
    const { dashboard } = this.props;
    const { hotLotteries } = dashboard;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          showRightSideMenuImageIcon
          onPressSideMenuRightIcon={() => this.setState({ isSideMenuVisible: !isSideMenuVisible })}
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
          <Banner />
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
          <View>
            <Text style={styles.carouselTitle}>H E A D I N G</Text>
            <Carousel
              data={this.state.Data}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width - 10}
              itemWidth={Dimensions.get('window').width - 10}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              enableMomentum
              activeSlideAlignment={'start'}
              // autoplay
              // autoplayDelay={500}
              // autoplayInterval={2500}
              containerCustomStyle
              contentContainerCustomStyle
              removeClippedSubviews={false}
            />
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
        {
       isSideMenuVisible
         ? <SideMenu />
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
