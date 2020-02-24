/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import CustomTextInput from '../../components/CustomTextInput';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';


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
    paddingLeft: 5,
    borderLeftColor: 'gray',
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    width: inputWidth,
  },
  emailIcon: {
    tintColor: UIColors.purpleButtonColor,
    width: itemSizes.iconLarge,
    height: itemSizes.iconLarge,
    marginHorizontal: spacing.medium,
    resizeMode: 'cover',
  },
  loginBtn: {
    marginTop: spacing.large,
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.semiMedium,
    paddingTop: spacing.medium,
  },
  referalTxt: {
    color: UIColors.textTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      referalId: '',
      have_Refferal: images.unCheckedIcon,
      Terms_Condtion: images.unCheckedIcon,
      is_Check: true,
      is_Terms_Check: true,
      // isShowPassword: false,
    };
  }

  Reffral_Image=() => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.is_Check === true) {
      this.setState({
        have_Refferal: images.checkedIcon,
      });
      this.state.is_Check = false;
    } else {
      this.setState({
        have_Refferal: images.unCheckedIcon,
      });
      this.state.is_Check = true;
    }
  }

  Terms_Condtion_Image=() => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.is_Terms_Check === true) {
      this.setState({
        Terms_Condtion: images.checkedIcon,
      });
      this.state.is_Terms_Check = false;
    } else {
      this.setState({
        Terms_Condtion: images.unCheckedIcon,
      });
      this.state.is_Terms_Check = true;
    }
  }

  onChangeEmailText(email) {
    this.setState({ email });
  }

  onChangeMobileNumberText(mobileNumber) {
    this.setState({ mobileNumber });
  }

  onChangePasswordText(password) {
    this.setState({ password });
  }

  onChangeConfirmPasswordText(confirmPassword) {
    this.setState({ confirmPassword });
  }

  onChangeReferalId(referalId) {
    this.setState({ referalId });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.email:
          this.mobileNumberInput.focus();
          break;
        case InputKey.mobileNumber:
          this.passwordInput.focus();
          break;
        case InputKey.password:
          this.confirmPasswordInput.focus();
          break;
        case InputKey.confirmPassword:
          this.referalIdInput.focus();
          break;
        case InputKey.referalId:
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
      case InputKey.mobileNumber:
        this.mobileNumberInput = reference;
        break;
      case InputKey.password:
        this.passwordInput = reference;
        break;
      case InputKey.confirmPassword:
        this.confirmPasswordInput = reference;
        break;
      case InputKey.referalId:
        this.referalIdInput = reference;
        break;
      default:
        break;
    }
  }

  getValidationErrorMessage() {
    // const {
    //   email, username, password,
    // } = this.state;
    // // Email
    // if (!email) {
    //   return commonLocalizeStrings.emptyEmailErrorMessage;
    // }
    // if (!isValidEmail(email)) {
    //   return commonLocalizeStrings.invalidEmailErrorMessage;
    // }
    // // Username
    // if (!username) {
    //   return commonLocalizeStrings.emptyUsernameErrorMessage;
    // }
    // if (!isValidUsername(username)) {
    //   return commonLocalizeStrings.invalidUsernameErrorMessage;
    // }
    // // Password
    // if (!password) {
    //   return commonLocalizeStrings.emptyPasswordErrorMessage;
    // }
    // // if (!isValidPassword(password)) {
    // //   return commonLocalizeStrings.invalidPasswordErrorMessage;
    // // }
    return null;
  }


  render() {
    // const {
    //   screenOrientation,
    //   facebookAction,
    //   googleAction,
    // } = this.props;
    const {
      email,
      mobileNumber,
      password,
      confirmPassword,
      referalId,
      have_Refferal,
      Terms_Condtion,
      is_Check,
      is_Terms_Check,

    } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.subContainer}>
            <Text style={styles.loginText}>{Localization.SignupScreen.Signup}</Text>
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
            <View style={[styles.textInputContainer, { marginTop: spacing.extraLarge }]}>
              <Image style={styles.emailIcon} source={images.mobileIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.SignupScreen.MobileNumber}
                inputKey={InputKey.mobileNumber}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                keyboardType={KeyboardType.phonePad}
                value={mobileNumber}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeMobileNumberText(value)}
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
                secureTextEntry
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangePasswordText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
              />
              {/* <ToggleIcon
                isShowPassword={isShowPassword}
                showPassowrdText={() => this.showPassowrdText()}
                // screenOrientation={screenOrientation}
              /> */}
            </View>
            <View style={[styles.textInputContainer, { marginTop: spacing.large }]}>
              <Image style={styles.emailIcon} source={images.passwordIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.SignupScreen.ConfirmPassword}
                inputKey={InputKey.confirmPassword}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                value={confirmPassword}
                secureTextEntry
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeConfirmPasswordText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
              />
              {/* <ToggleIcon
                isShowPassword={isShowPassword}
                showPassowrdText={() => this.showPassowrdText()}
                // screenOrientation={screenOrientation}
              /> */}
            </View>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity onPress={this.Reffral_Image}>
                <Image style={styles.emailIcon} source={have_Refferal} />
              </TouchableOpacity>
              <Text style={styles.referalTxt}>{Localization.SignupScreen.referalCode}</Text>
            </View>
            <View style={[styles.textInputContainer, { marginTop: spacing.small }]}>
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.SignupScreen.refererId}
                inputKey={InputKey.referalId}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.phonePad}
                value={referalId}
                returnKeyType={ReturnKeyType.done}
                onChangeText={(value) => this.onChangeReferalId(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity onPress={this.Terms_Condtion_Image}>
                <Image style={styles.emailIcon} source={Terms_Condtion} />

              </TouchableOpacity>
              <Text style={styles.referalTxt}>{Localization.SignupScreen.termsAndPolicy}</Text>
            </View>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginBtntxt}>{Localization.SignupScreen.Signup}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = () => UserActions;

const SignupScreen = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupScreen;
