/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import base64 from 'react-native-base64';
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
import { showPopupAlert } from '../../utils/showAlert';
import { isNetworkConnected } from '../../utils/utils';


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
    fontSize: fontSizes.large,
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
    width: itemSizes.iconLarge,
    height: itemSizes.iconLarge,
    marginHorizontal: spacing.medium,
    resizeMode: 'cover',
  },
  checkIcon: {
    // tintColor: UIColors.,
    width: itemSizes.iconLarge,
    height: itemSizes.iconLarge,
    marginHorizontal: spacing.medium,
    resizeMode: 'cover',
  },
  loginBtn: {
    marginTop: spacing.large,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    // width: itemSizes.largeWidth,
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

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      // isShowPassword: false,
    };
  }


  onChangeNewPasswordText(newPassword) {
    this.setState({ newPassword });
  }

  onChangeOldPasswordText(oldPassword) {
    this.setState({ oldPassword });
  }

  onChangeConfirmPasswordText(confirmPassword) {
    this.setState({ confirmPassword });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.oldPassword:
          this.oldPasswordInput.focus();
          break;
        case InputKey.newPassword:
          this.newPasswordInput.focus();
          break;
        case InputKey.confirmPassword:
          this.confirmPasswordInput.focus();
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
      case InputKey.oldPassword:
        this.oldPasswordInput = reference;
        break;
      case InputKey.newPassword:
        this.newPasswordInput = reference;
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
    const {
      email, mobileNumber, password, confirmPassword, referalId,
      have_Refferal, Terms_Condtion, isReferalCheck, is_Terms_Check,
    } = this.state;
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
    // if (!isValidPassword(password)) {
    //   return commonLocalizeStrings.invalidPasswordErrorMessage;
    // // }
    return null;
  }

  getValidation() {
    const {
      oldPassword, confirmPassword, newPassword,
    } = this.state;
    if (!oldPassword) {
      alert('old password is required');
    } else
    if (!newPassword) {
      alert('new password is required');
    } else
    if (!confirmPassword) {
      alert('confirm password is required');
    } else
    if (newPassword === confirmPassword) {
      this.changePasswordAction();
    } else {
      alert('Passwords do not match');
    }
  }

  changePasswordAction() {
    const {
      oldPassword, confirmPassword, newPassword,
    } = this.state;
    const { changepasswordRequest } = this.props;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      isNetworkConnected((isConnected) => {
        const paramsObject = {
          old_password: base64.encode(oldPassword),
          new_password: base64.encode(newPassword),
          confirm_Password: base64.encode(confirmPassword),
          user_type: '0',
        };
        if (isConnected) {
          changepasswordRequest(paramsObject);
        }
      });
    }
  }


  render() {
    // const {
    //   screenOrientation,
    //   facebookAction,
    //   googleAction,
    // } = this.props;
    const {
      oldPassword,
      newPassword,
      confirmPassword,

    } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showBackButton
        />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.subContainer}>
            <Text style={styles.loginText}>{Localization.ChangePasswordScreen.ChangePassword}</Text>
            <View style={[styles.textInputContainer, { marginTop: spacing.large }]}>
              <Image style={styles.emailIcon} source={images.passwordIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.ChangePasswordScreen.OldPassword}
                inputKey={InputKey.oldPassword}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                value={oldPassword}
                secureTextEntry
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeOldPasswordText(value)}
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
                placeholder={Localization.ChangePasswordScreen.NewPassword}
                inputKey={InputKey.newPassword}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                value={newPassword}
                secureTextEntry
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeNewPasswordText(value)}
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
                placeholder={Localization.ChangePasswordScreen.ConfirmPassword}
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
            <TouchableOpacity style={styles.loginBtn} onPress={() => this.getValidation()}>
              <Text style={styles.loginBtntxt}>{Localization.ChangePasswordScreen.UpdatePassword}</Text>
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

const ChangePasswordScreen = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

export default ChangePasswordScreen;
