/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, ScrollView, RefreshControl, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserActions from '../../actions';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import BackgroundMessage from '../../components/BackgroundMessage';
import HeaderAd from '../../components/HeaderAd';
import { responsiveSize } from '../../utils/utils';
import DateManager from '../../utils/dateManager';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: UIColors.navigationBar,
    flex: 1,
  },
  subContainer: {
    backgroundColor: UIColors.appBackGroundColor,
    flex: 1,
  },
  listView: {
    marginHorizontal: spacing.extraSmall,
    flex: 1,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingTop: spacing.extraExtraSmall,
    borderBottomColor: UIColors.grayBackgroundColor,
    borderBottomWidth: 2,
    paddingVertical: spacing.small,
    // backgroundColor: 'yellow',
  },
  seperator: {
    flex: 1,
    height: 1,
    backgroundColor: UIColors.grayBackgroundColor,
  },
  headerTxtStyle: {
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProRegular,
    color: UIColors.blackTxt,
    textAlign: 'center',
  },
  txtStyle: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    color: UIColors.blackTxt,
    textAlign: 'center',
  },
});


class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabIndex: 0,
      isPopupVisible: false,
    };
  }

  componentDidMount() {
    this.props.getAllNotificationsRequest({
      itemsPerPage: 12,
      currentPage: 1,
    });
    this.props.userUnreadNotificationRequest({});
  }

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
  }

  FlatlistHeader = () => (
    <View
      style={styles.rowView}
    >
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent' }}>
        <Text style={styles.headerTxtStyle}>Date</Text>
      </View>
      <View style={{ flex: 1.5, justifyContent: 'center' }}>
        <Text style={styles.headerTxtStyle}>Message</Text>
      </View>
    </View>
  );


  render() {
    // const {} = this.state;
    const { notification, dashboard } = this.props;
    const { notificationList, myNotificationsTotalPages, currentNotificationPage } = notification;
    const { isPopupVisible } = this.state;
    // const {} = notification;
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
        <ScrollView
          style={styles.subContainer}
          refreshControl={(
            <RefreshControl
              refreshing={false}
              onRefresh={() => this.refreshMyLotteries()}
            />
          )}
        >
          <HeaderAd adData={dashboard.headerAd} />
          <View style={styles.listView}>
            { notificationList.length !== 0 ? (
              <FlatList
                key="v"
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={this.FlatlistHeader}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                data={notificationList}
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
                  const date = new Date(item.item.created_date);
                  const matchDate = DateManager.formatDateToString(date);
                  const time = DateManager.DisplayCurrentTime(date);
                  return (
                    <View
                      style={styles.rowView}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.txtStyle}>
                          {`${matchDate} ${time}`}
                        </Text>
                      </View>
                      <View style={{ flex: 1.3 }}>
                        <Text style={styles.txtStyle}>{item.item.notification}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            )
              : (<BackgroundMessage title="No data available" />)}
          </View>
          {/* <View style={{ flex: 1, marginTop: spacing.small }}>
            <HeaderAd adData={dashboard.footerAd} />
          </View> */}
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

notification.propTypes = {
  logoutRequest: PropTypes.func,
  dashboard: PropTypes.object,
  notification: PropTypes.object,
  profileResponse: PropTypes.object,
};

notification.defaultProps = {
  logoutRequest: () => {},
  dashboard: {},
  notification: {},
  profileResponse: {},
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  notification: state.notificationReducer,
  profileResponse: state.getProfileDataReducer.profileResponse,
});

const mapDispatchToProps = () => UserActions;

const notificationScreen = connect(mapStateToProps, mapDispatchToProps)(notification);

export default notificationScreen;
