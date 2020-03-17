import React, { Component } from 'react';
import {
  ImageBackground, StyleSheet, Dimensions, View, Image,
} from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import constant, { screenNames, appIntervals } from '../../utils/constant';
import { images } from '../../assets/images';
import { Storage } from '../../storage/storage';
import { UserData } from '../../utils/global';
import {
  spacing, UIColors, itemSizes, fontName, fontSizes,
} from '../../utils/variables';
import { responsiveSize } from '../../utils/utils';
import { isIOS } from '../../utils/plateformSpecific';

const styles = StyleSheet.create({
  splashImage: {
    // flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logoImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: isIOS ? '70%' : '80%',
    height: isIOS ? '20%' : '30%',
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
    Storage.getItemWithKey(constant.PROFILE_DATA, (response) => {
      if (response) {
        UserData.ProfileData = response;
      }
    });
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
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={images.splash}
          style={styles.splashImage}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={images.logo}
            style={styles.logoImage}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = () => UserActions;

const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashScreen;
