/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView,
} from 'react-native';
import base64 from 'react-native-base64';
// import { screenNames, appIntervals } from '../../utils/constant';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import CustomTextInput from '../../components/CustomTextInput';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { InputKey, KeyboardType, ReturnKeyType, screenNames } from '../../utils/constant';
import ToggleIcon from '../../components/ToggleIcon';
import { showPopupAlert } from '../../utils/showAlert';
import { isIOS } from '../../utils/plateformSpecific';
import { AuthWelcomeView } from '../../utils/enum';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import SideMenu from '../../components/SideMenu';

const inputWidth = '90%';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.appBackGroundColor,
  },
  subContainer: {
    flex: 1,
    marginVertical: spacing.extraLarge,
  },
  loginText: {
    fontSize: fontSizes.extraLarge,
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProBold,
    textAlign: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.large,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
  },
  textInput: {
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
    borderLeftWidth: 1,
    padding: spacing.small,
    borderLeftColor: 'gray',
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    width: inputWidth,
  },
  emailIcon: {
    tintColor: UIColors.purpleButtonColor,
    width: itemSizes.iconSmall,
    height: itemSizes.iconSmall,
    marginHorizontal: spacing.medium,
    resizeMode: 'contain',
  },
  forgotBtn: {
    marginLeft: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.small,
  },
  forgotImage: {
    resizeMode: 'cover',
    height: itemSizes.iconSmall,
    width: itemSizes.iconSmall,
    tintColor: UIColors.navigationBar,
  },
  forgotText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
    color: UIColors.textTitle,
    paddingLeft: spacing.extraExtraSmall,
  },
  loginBtn: {
    marginTop: spacing.small,
    paddingVertical: spacing.small,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColors.purpleButtonColor,
  },
  resetBtn: {
    marginTop: spacing.small,
    paddingVertical: spacing.semiMedium,
    width: itemSizes.extraLargeWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColors.purpleButtonColor,
  },
  loginBtntxt: {
    color: UIColors.navigationTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      forgetEmail: '',
      isShowPassword: false,
      isSideMenuVisible: false,
    };
  }

  onChangeEmailText(email) {
    this.setState({ email });
  }

  onChangeForgetEmailText(forgetEmail) {
    this.setState({ forgetEmail });
  }

  onChangePasswordText(password) {
    this.setState({ password });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.email:
          this.passwordInput.focus();
          break;
        case InputKey.password:
          break;
        case InputKey.forgotPassword:
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(' error: ', error);
    }
  }


  getTextInputReference(key, reference) {
    switch (key) {
      case InputKey.email:
        this.emailInput = reference;
        break;
      case InputKey.password:
        this.passwordInput = reference;
        break;
      case InputKey.forgotPassword:
        this.forgotPasswordInput = reference;
        break;
      default:
        break;
    }
  }

  getValidationErrorMessage() {
    // Email or Username
    // if (!email) {
    //   return commonLocalizeStrings.emptyEmailUsernameErrorMessage;
    // }
    // if (isEmailText(email)) {
    //   if (!isValidEmail(email)) {
    //     return commonLocalizeStrings.invalidEmailErrorMessage;
    //   }
    // } else if (!isValidUsername(email)) {
    //   return commonLocalizeStrings.incorrectUsernameErrorMessage;
    // }
    // // Password
    // if (!password) {
    //   return commonLocalizeStrings.emptyPasswordErrorMessage;
    // }
    return null;
  }


  showPassowrdText() {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  }

  loginAction() {
    const { email, password } = this.state;
    const { loginRequest } = this.props;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      // isNetworkConnected((isConnected) => {
      //   if (isConnected) {
      const data = {
        // email: 'smenariya@gammastack.com',
        email,
        password: base64.encode(password),
        device_id: 1,
        device_type: 1,
        remember_me: false,
        user_type: '0',
        other_session_key: '',
      };
      loginRequest(data);
      // }
      // });
    }
  }

  renderLogin = () => {
    const {
      email,
      password,
      isShowPassword,
    } = this.state;
    return (
      <View>
        <Text style={styles.loginText}>{Localization.loginScreen.LOGIN}</Text>
        <View style={[styles.textInputContainer, { marginTop: spacing.extraLarge }]}>
          <Image style={styles.emailIcon} source={images.email} />
          <CustomTextInput
            textInput={StyleSheet.flatten(styles.textInput)}
            inputView={StyleSheet.flatten(styles.textInputView)}
            placeholderTextColor={UIColors.defaultTextColor}
            placeholder={Localization.loginScreen.Email}
            inputKey={InputKey.email}
            getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
            keyboardType={KeyboardType.emailAddress}
            value={email}
            returnKeyType={ReturnKeyType.next}
            onChangeText={(value) => this.onChangeEmailText(value)}
            onSubmitEditing={(key) => this.onSubmitEditing(key)}
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.textInputContainer, { marginTop: spacing.large }]}>
          <Image style={styles.emailIcon} source={images.passwordIcon} />
          <CustomTextInput
            textInput={StyleSheet.flatten(styles.textInput)}
            inputView={StyleSheet.flatten(styles.textInputView)}
            placeholderTextColor={UIColors.defaultTextColor}
            placeholder={Localization.loginScreen.Password}
            inputKey={InputKey.password}
            getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
            value={password}
            secureTextEntry={!isShowPassword}
            returnKeyType={ReturnKeyType.done}
            onChangeText={(value) => this.onChangePasswordText(value)}
            onSubmitEditing={(key) => this.onSubmitEditing(key)}
          />
          <ToggleIcon
            isShowPassword={isShowPassword}
            showPassowrdText={() => this.showPassowrdText()}
          />
        </View>
        <TouchableOpacity style={styles.forgotBtn} onPress={() => this.openCurrentView(AuthWelcomeView.AUTH_FORGOT_PASSWORD)}>
          <Image
            source={images.questionIcon}
            style={styles.forgotImage}
          />
          <Text style={styles.forgotText}>{Localization.loginScreen.ForgotPassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginAction()}>
          <Text style={styles.loginBtntxt}>{Localization.loginScreen.LOGIN}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderForgetPassword = () => {
    const {
      forgetEmail,
    } = this.state;
    return (
      <View>
        <Text style={styles.loginText}>{Localization.FORGETPASSWORD}</Text>
        <View style={[styles.textInputContainer, { marginTop: spacing.extraLarge }]}>
          <Image style={styles.emailIcon} source={images.email} />
          <CustomTextInput
            textInput={StyleSheet.flatten(styles.textInput)}
            inputView={StyleSheet.flatten(styles.textInputView)}
            placeholderTextColor={UIColors.defaultTextColor}
            placeholder={Localization.loginScreen.Email}
            inputKey={InputKey.forgotPassword}
            getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
            keyboardType={KeyboardType.emailAddress}
            value={forgetEmail}
            returnKeyType={ReturnKeyType.next}
            onChangeText={(value) => this.onChangeForgetEmailText(value)}
            onSubmitEditing={(key) => this.onSubmitEditing(key)}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.forgotBtn} onPress={() => this.openCurrentView(AuthWelcomeView.AUTH_LOGIN)}>
          <Image
            source={images.questionIcon}
            style={styles.forgotImage}
          />
          <Text style={styles.forgotText}>{Localization.loginScreen.RememberPassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={() => this.forgetpasswordAction()}>
          <Text style={styles.loginBtntxt}>{Localization.loginScreen.ResetPassword}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  openCurrentView = (currentAuthWelcomeView) => {
    const { openLoginView, openAuthForgotPasswordView } = this.props;
    switch (currentAuthWelcomeView) {
      case AuthWelcomeView.AUTH_LOGIN:
        return (openLoginView());
      case AuthWelcomeView.AUTH_FORGOT_PASSWORD:
        return (openAuthForgotPasswordView());
      default:
        return (openLoginView());
    }
  }

  renderCurrentView = (currentAuthWelcomeView) => {
    switch (currentAuthWelcomeView) {
      case AuthWelcomeView.AUTH_LOGIN:
        return (this.renderLogin());
      case AuthWelcomeView.AUTH_FORGOT_PASSWORD:
        return (this.renderForgetPassword());
      default:
        return (this.renderLogin()());
    }
  }

  forgetpasswordAction() {
    const { forgetEmail } = this.state;
    const { forgetpasswordRequest } = this.props;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      // isNetworkConnected((isConnected) => {
      //   if (isConnected) {
      const data = {
        // email: 'smenariya@gammastack.com',
        forgotemail: forgetEmail,
        user_type: '0',
      };
      forgetpasswordRequest(data);
      // }
      // });
    }
  }


  render() {
    const { currentAuthWelcomeView } = this.props;
    const { isSideMenuVisible } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showRightSideMenuImageIcon
          onPressSideMenuRightIcon={() => this.setState({ isSideMenuVisible: !isSideMenuVisible })}
        />
        <View style={styles.subContainer}>
          {this.renderCurrentView(currentAuthWelcomeView)}
        </View>
        {
       isSideMenuVisible
         ? <SideMenu />
         : null
     }
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func,
  forgetpasswordRequest: PropTypes.func,
  openLoginView: PropTypes.func,
  openForgotPasswordView: PropTypes.func,
  currentAuthWelcomeView: PropTypes.number,
};

Login.defaultProps = {
  loginRequest: () => {},
  forgetpasswordRequest: () => {},
  openForgotPasswordView: () => {},
  openLoginView: () => {},
  currentAuthWelcomeView: AuthWelcomeView.AUTH_LOGIN,
};

const mapStateToProps = (state) => ({
  currentAuthWelcomeView: state.authWelcomeReducer.currentAuthWelcomeView,
});

const mapDispatchToProps = () => UserActions;

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginScreen;
