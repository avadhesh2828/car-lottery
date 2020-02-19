import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { screenNames, appIntervals } from '../../utils/constant';
import { images } from '../../assets/images';

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
    setTimeout(() => { this.goToScreen() }, appIntervals.SPLASH_INTERVAL);
  }

  goToScreen() {
    // this.props.getSportsRequest();
    let screenName = screenNames.MY_TICKET_DETAIL_SCREEN;
    Navigation.sharedInstance().resetRouteName(screenName);
  }

  render() {
    return (
      <ImageBackground
        source={images.logo}
        resizeMode={'center'}
        style={styles.splashImage} />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashScreen;

