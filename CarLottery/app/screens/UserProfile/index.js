import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { responsiveSize } from '../../utils/utils';
import HeaderContainer from './components/HeaderContainer';
import { Localization } from '../../utils/localization';
import CustomTextInput from '../../components/CustomTextInput';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';

const inputWidth = '90%';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginVertical: spacing.extraLarge,
    backgroundColor: 'orange',
  },
  personalText: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.grayText,
    fontFamily: fontName.sourceSansProRegular,
    marginHorizontal: spacing.large,
    // textAlign: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.large,
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    // backgroundColor: 'green',
    marginTop: spacing.small,
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
    width: itemSizes.iconLarge,
    height: itemSizes.iconLarge,
    marginHorizontal: spacing.medium,
    resizeMode: 'cover',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    width: itemSizes.defaultLargeButtonHeight,
    backgroundColor: UIColors.navigationBar,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  cancelButton: {
    width: itemSizes.defaultLargeButtonHeight,
    backgroundColor: UIColors.purpleButtonColor,
    marginLeft: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  updateTxt: {
    color: UIColors.whiteTxt,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
  cancelTxt: {
    color: UIColors.blackTxt,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      dob: '',
      gender: '',
      country: '',
      state: '',
      city: '',
      address: '',
      zipCode: '',
      // isShowPassword: false,
    };
  }

  onChangeEmailText(email) {
    this.setState({ email });
  }

  onChangeFirstNameText(firstName) {
    this.setState({ firstName });
  }

  onChangeLastNameText(lastName) {
    this.setState({ lastName });
  }

  onChangeMobileNumberText(mobileNumber) {
    this.setState({ mobileNumber });
  }

  onChangeCityText(city) {
    this.setState({ city });
  }

  onChangeAddressText(address) {
    this.setState({ address });
  }

  onChangeZipCodeText(zipCode) {
    this.setState({ zipCode });
  }

  // onChangeEmailText(mobileNumber) {
  //   this.setState({ mobileNumber });
  // }

  // onChangeEmailText(city) {
  //   this.setState({ city });
  // }

  // onChangeEmailText(address) {
  //   this.setState({ address });
  // }

  // onChangeEmailText(zipCode) {
  //   this.setState({ zipCode });
  // }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.firstName:
          this.lastNameInput.focus();
          break;
        case InputKey.lastName:
          this.emailInput.focus();
          break;
        case InputKey.email:
          this.mobileNumberInput.focus();
          break;
        case InputKey.mobileNumber:
          this.cityInput.focus();
          break;
        case InputKey.city:
          this.addressInput.focus();
          break;
        case InputKey.address:
          this.zipCodeInput.focus();
          break;
        case InputKey.zipCode:
          break;
          // this.mobileNumberInput.focus();
        // case InputKey.mobileNumber:
        //   this.passwordInput.focus();
        //   break;
        // case InputKey.password:
        //   this.confirmPasswordInput.focus();
        //   break;
        // case InputKey.confirmPassword:
        //   this.referalIdInput.focus();
        //   break;
        // case InputKey.referalId:
        //   break;
        default:
          break;
      }
    } catch (error) {
      console.log(' error: ', error);
    }
  }

  getTextInputReference(key, reference) {
    switch (key) {
      case InputKey.firstName:
        this.firstNameInput = reference;
        break;
      case InputKey.lastName:
        this.lastNameInput = reference;
        break;
      case InputKey.email:
        this.emailInput = reference;
        break;
      case InputKey.mobileNumber:
        this.mobileNumberInput = reference;
        break;
      case InputKey.city:
        this.cityInput = reference;
        break;
      case InputKey.address:
        this.addressInput = reference;
        break;
      case InputKey.zipCode:
        this.zipCodeInput = reference;
        break;
      // case InputKey.password:
      //   this.passwordInput = reference;
      //   break;
      // case InputKey.confirmPassword:
      //   this.confirmPasswordInput = reference;
      //   break;
      // case InputKey.referalId:
      //   this.referalIdInput = reference;
      //   break;
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
    const {
      email, firstName, lastName, mobileNumber, dob, gender, country,
      state, city, address, zipCode,
    } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader />
        <HeaderContainer />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.subContainer}>
            <Text style={styles.personalText}>Personal Info</Text>
            <View style={[styles.textInputContainer, { }]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.firstName}
                inputKey={InputKey.firstName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={firstName}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeFirstNameText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, { }]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.lastName}
                inputKey={InputKey.lastName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={lastName}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeLastNameText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, { }]}>
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
            <View style={[styles.textInputContainer, { }]}>
              <Image style={styles.emailIcon} source={images.email} />
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
            {/* ======== */}
            <View style={[styles.textInputContainer, { }]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.city}
                inputKey={InputKey.city}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.phonePad}
                value={city}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeCityText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, { }]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.address}
                inputKey={InputKey.address}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.phonePad}
                value={address}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeAddressText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, { }]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.zipCode}
                inputKey={InputKey.zipCode}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                keyboardType={KeyboardType.phonePad}
                value={zipCode}
                returnKeyType={ReturnKeyType.done}
                onChangeText={(value) => this.onChangeZipCodeText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateTxt}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.updateTxt}>Cancel</Text>
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

const UserProfileScreen = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfileScreen;
