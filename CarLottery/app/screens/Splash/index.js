import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import constant, { screenNames, appIntervals } from '../../utils/constant';
import { images } from '../../assets/images';
import { Storage } from '../../storage/storage';
import { UserData } from '../../utils/global';
const styles = StyleSheet.create({
  splashImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Splash extends Component {
  constructor(props) {
    super(props);
    Navigation.sharedInstance().setAppNavigation(props.navigation);
  }

  componentDidMount() {
    setTimeout(() => { this.navigateToCurrentScreen(); }, appIntervals.SPLASH_INTERVAL);
  }

  navigateToCurrentScreen() {
    Storage.getItemWithKey(constant.SESSION_KEY, (response) => {
      let screen = 'TabNavigator';
      if (response) {
        UserData.SessionKey = response;
        screen = 'TabLoginNavigator';
      } else {
        screen = 'TabNavigator';
      }
      this.goToScreen(screen);
    });
  }

  goToScreen(screen) {
    Navigation.sharedInstance().resetRouteName(screen);
  }

  render() {
    return (
      <ImageBackground
        source={images.logo}
        resizeMode={'center'}
        style={styles.splashImage}
      />
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = () => UserActions;

const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashScreen;
