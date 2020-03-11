import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  DatePickerAndroid,
  DatePickerIOS,
  Keyboard,
  TextInput,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import Loader from '../../components/Loader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { responsiveSize } from '../../utils/utils';
import HeaderContainer from './components/HeaderContainer';
import DateManager from '../../utils/dateManager';
import { Localization } from '../../utils/localization';
import CustomTextInput from '../../components/CustomTextInput';
import CustomText from '../../components/CustomText';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';

const inputWidth = '90%';
let isOpenDOBPicker = false;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginVertical: spacing.extraLarge,
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
  dobContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.small,
    borderColor: 'gray',
    borderLeftWidth: spacing.border,
  },
  dropdownStyle: {
    width: '85%',
    // borderLeftWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: spacing.extraSmall,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.profileResponse.first_name,
      lastName: this.props.profileResponse.last_name,
      mobileNumber: this.props.profileResponse.phone_number,
      email: this.props.profileResponse.email,
      dob: new Date(),
      isShowDatePicker: false,
      gender: '',
      country: this.props.profileResponse.country_name,
      state: this.props.profileResponse.state_name,
      city: this.props.profileResponse.city,
      address: this.props.profileResponse.address,
      zipCode: this.props.profileResponse.pincode,
      // isShowPassword: false,
    };
  }

  componentDidMount() {
    this.props.getCountryRequest();
    this.props.getProfileRequest();
    // this.props.getStateRequest('231');
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

  onChangeDobText(dob) {
    this.setState({ dob });
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

  setDOBDate(newDate) {
    this.setState({ dob: newDate });
  }

  androidPicker = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: new Date(),
        maxDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        this.setState({ isShowDatePicker: false, dob: date });
      } else {
        this.setState({
          isShowDatePicker: false,
        });
      }
    } catch ({ code, message }) {
      console.warn('Warning !', message);
    }
  }

  updateStateDOB() {
    this.setState({
      isShowDatePicker: !this.state.isShowDatePicker,
    });
  }

  dismissKeyBoard() {
    Keyboard.dismiss();
    if (this.state.isShowDatePicker) {
      this.setState({ isShowDatePicker: false });
    }
  }

  showDOBPicker() {
    Keyboard.dismiss();
    isOpenDOBPicker = true;
    if (isIOS) {
      return (
        <View style={{ flex: 1 }}>
          <DatePickerIOS
            date={this.state.dob}
            mode="date"
            onDateChange={this.setDOBDate}
            maximumDate={new Date()}
          />
          <View style={[styles.cellView, { flexDirection: 'row' }]}>
            <TouchableOpacity
              onPress={() => this.updateStateDOB()}
              style={styles.okCancelButton}
            >
              <Text style={styles.okCancelButtonText}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
    this.androidPicker();
    return null;
  }

  selectedCountryItem(item, index, data) {
    let countryData = {};
    data.forEach((element) => {
      if (item === element.value) {
        countryData = element;
      }
    });

    this.props.getStateRequest(countryData.data.master_country_id);
  }

  selectedStateItem(item, index, data) {
  }

  render() {
    const {
      email, firstName, lastName, mobileNumber, dob, gender, country,
      state, city, address, zipCode, isShowDatePicker,
    } = this.state || this.props.profileResponse;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader />
        <HeaderContainer />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.subContainer}>
            <Text style={styles.personalText}>Personal Info</Text>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.firstName}
                inputKey={InputKey.firstName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={this.props.profileResponse.first_name}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeFirstNameText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.lastName}
                inputKey={InputKey.lastName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={this.props.profileResponse.last_name}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeLastNameText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.loginScreen.Email}
                inputKey={InputKey.email}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                keyboardType={KeyboardType.emailAddress}
                value={this.props.profileResponse.email}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeEmailText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.SignupScreen.MobileNumber}
                inputKey={InputKey.mobileNumber}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                keyboardType={KeyboardType.phonePad}
                value={this.props.profileResponse.phone_number}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeMobileNumberText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image style={styles.emailIcon} source={images.email} />
              <View style={styles.dobContainer}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.updateStateDOB()}
                >
                  <Text style={[isOpenDOBPicker ? { color: UIColors.primaryText } : { color: UIColors.grayText }]}>
                    {isOpenDOBPicker ? DateManager.formatDateWithDash(dob) : 'Date of Birth'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {
              this.props.countryResponse.length > 0 && (
                <View style={[styles.textInputContainer, {}]}>
                  <Image style={styles.emailIcon} source={images.email} />
                  <Dropdown
                    fontSize={15}
                    containerStyle={[styles.dropdownStyle, {}]}
                    label={Localization.userProfileScreen.selectCountry}
                    data={this.props.countryResponse}
                    onChangeText={(item, index, data) => this.selectedCountryItem(item, index, data)}
                    inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
                  />
                </View>
              )
            }
            {
              this.props.stateResponse.length > 0 && (
                <View style={[styles.textInputContainer, {}]}>
                  <Image style={styles.emailIcon} source={images.email} />
                  <Dropdown
                    fontSize={15}
                    containerStyle={styles.dropdownStyle}
                    label={Localization.userProfileScreen.selectState}
                    data={this.props.stateResponse}
                    onChangeText={(item, index, data) => this.selectedStateItem(item, index, data)}
                    inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
                  />
                </View>
              )
            }

            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.city}
                inputKey={InputKey.city}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.phonePad}
                value={this.props.profileResponse.city}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeCityText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
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
            <View style={[styles.textInputContainer, {}]}>
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
        {isShowDatePicker && (isIOS
          ? (
            <Modal
              visible={isShowDatePicker}
              transparent
            >
              <View style={styles.pickerModal}>
                {this.showDOBPicker()}
              </View>
            </Modal>
          )
          : (
            <View style={styles.pickerModal}>
              {this.showDOBPicker()}
            </View>
          ))}
        {this.props.isLoading
          && <Loader isAnimating={this.props.isLoading} />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  countryResponse: state.getCountriesReducer.countryResponse,
  countryResponseisLoading: state.getCountriesReducer.isLoading,
  stateResponse: state.getStatesReducer.statesResponse,
  stateResponseisLoading: state.getStatesReducer.isLoading,
  profileResponse: state.getProfileDataReducer.profileResponse,
  profileResponseisLoading: state.getProfileDataReducer.isLoading,

  isLoading: state.getStatesReducer.isLoading || state.getCountriesReducer.isLoading || state.getProfileDataReducer.isLoading,
});

const mapDispatchToProps = () => UserActions;

const UserProfileScreen = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfileScreen;
