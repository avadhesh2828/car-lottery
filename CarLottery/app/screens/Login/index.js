import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
// import { screenNames, appIntervals } from '../../utils/constant';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import CustomTextInput from '../../components/CustomTextInput';
import { spacing, UIColors, fontSizes, fontName, itemSizes } from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constant';
import ToggleIcon from '../../components/ToggleIcon';

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
    height: itemSizes.defaultIosTextInputHeight,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
  },
  textInput: {
    height: itemSizes.defaultIosTextInputHeight,
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
    borderLeftWidth: 1,
    paddingLeft: 5,
    borderLeftColor: 'gray',
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    width: inputWidth,
  },
  emailIcon: {
    width: itemSizes.iconLarge,
    height: itemSizes.iconLarge,
    marginHorizontal: spacing.medium,
    resizeMode: 'cover',
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
      isShowPassword: false,
    };
  }

  onChangeEmailText(email) {
    this.setState({ email });
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
      default:
        break;
    }
  }

  getValidationErrorMessage() {
    const { email, password } = this.state;
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


  render() {
    const {
      email,
      password,
      isShowPassword,
    } = this.state;

    return (
      <View style={styles.mainContainer}>
        <NavigationHeader />
        <View style={styles.subContainer}>
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
              // screenOrientation={screenOrientation}
            />
          </View>
          <TouchableOpacity style={styles.forgotBtn}>
            <Image
              source={images.questionIcon}
              style={styles.forgotImage}
            />
            <Text style={styles.forgotText}>{Localization.loginScreen.ForgotPassword}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtntxt}>{Localization.loginScreen.LOGIN}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginScreen;
