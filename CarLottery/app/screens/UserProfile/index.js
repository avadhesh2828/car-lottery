/* eslint-disable react/destructuring-assignment */
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
import PropTypes from 'prop-types';
import { prototype } from 'react-native-modal-dropdown';
import { showPopupAlert } from '../../utils/showAlert';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import Loader from '../../components/Loader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { responsiveSize, isNetworkConnected } from '../../utils/utils';
import HeaderContainer from './components/HeaderContainer';
import ChooseImagePopup from '../../components/ChooseImagePopup';
// import ContextMenuButton from '../../components/ContextMenuButton';
// import Co from '../../components/ContextMenu';
import DateManager from '../../utils/dateManager';
import { Localization } from '../../utils/localization';
import CustomTextInput from '../../components/CustomTextInput';
import CustomText from '../../components/CustomText';
import {
  InputKey, KeyboardType, ReturnKeyType, screenNames,
} from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';
import { UserData } from '../../utils/global';
import PopUpScreen from '../../components/PopupScreen';
import HeaderAd from '../../components/HeaderAd';
import {
  isValidUsername, isValidFirstName, isValidLastName, isValidCity,
} from '../../utils/validators';
import SideMenu from '../../components/SideMenu';

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
    width: '100%',
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
    justifyContent: 'center',
    paddingLeft: spacing.semiMedium,
    paddingTop: spacing.semiMedium,
  },
  dropdownConatiner: {
    borderLeftWidth: 1,
    borderLeftColor: UIColors.grayText,
    width: '85%',
    height: isIOS ? itemSizes.defaultIosTextInputHeight : itemSizes.defaultAndroidTextInputHeight,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.profileResponse && this.props.profileResponse.first_name,
      lastName: this.props.profileResponse && this.props.profileResponse.last_name,
      mobileNumber: this.props.profileResponse && this.props.profileResponse.phone_number,
      email: this.props.profileResponse && this.props.profileResponse.email,
      dob: new Date(),
      isShowDatePicker: false,
      gender: '',
      country: this.props.profileResponse && this.props.profileResponse.country_name,
      countryID: '',
      main: this.props.profileResponse && this.props.profileResponse.state_name,
      mainID: '',
      city: this.props.profileResponse && this.props.profileResponse.city,
      address: this.props.profileResponse && this.props.profileResponse.address,
      isPopupVisible: false,
      username: '',
      isShowImagePopup: false,
      imageToShow: '',
      imageLoading: false,
      isSideMenuVisible: false,
      // isShowPassword: false,
    };
  }

  componentDidMount() {
    this.props.getCountryRequest();
    this.props.getProfileRequest();
    if (this.props.profileResponse && this.props.profileResponse.master_country_id) this.props.getStateRequest(this.props.profileResponse.master_country_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.profileResponseisLoading !== prevProps.profileResponseisLoading && prevProps.profileResponseisLoading === true) {
      this.onProfileResponse();
    }
  }

  onProfileResponse() {
    if (this.props.profileResponse) {
      this.setState({
        firstName: this.props.profileResponse.first_name,
        lastName: this.props.profileResponse.last_name,
        mobileNumber: this.props.profileResponse.phone_number,
        email: this.props.profileResponse.email,
        country: this.props.profileResponse.country_name,
        main: this.props.profileResponse.state_name,
        city: this.props.profileResponse.city,
        address: this.props.profileResponse.address,
        dob: this.props.profileResponse.dob,
        username: this.props.profileResponse.user_name,
      });
    }
  }

  setAvaterSource(uri, multipartBody) {
    if (uri && uri.length > 0 && multipartBody) {
      this.props.setUserProfileImage(uri);
      this.uploadProfileImage(multipartBody);
    }
  }

  // eslint-disable-next-line react/sort-comp
  uploadProfileImage(paramsObject) {
    // const { uploadKycImageRequest } = this.props;
    isNetworkConnected((isConnected) => {
      if (isConnected) {
        this.props.uploadProfileImageRequest(paramsObject);
      }
    });
  }

  changeImageLoadingState(boolean) {
    this.setState({
      imageLoading: boolean,
    });
  }

  isShowPopupDialog=() => {
    this.setState({
      isShowImagePopup: !this.state.isShowImagePopup,
      // imageToShow: imageId,
    });
  };

  onChangeView() {
    this.setState({ isPopupVisible: !this.state.isPopupVisible });
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


  // onChangeEmailText(mobileNumber) {
  //   this.setState({ mobileNumber });
  // }

  // onChangeEmailText(city) {
  //   this.setState({ city });
  // }

  // onChangeEmailText(address) {
  //   this.setState({ address });
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
    const {
      firstName, lastName, mobileNumber, email, dob, username, state, city, address, country, main,
    } = this.state;
    // // Username
    if (!username) {
      return Localization.emptyUserNameErrorMessage;
    }

    if (!isValidUsername(username)) {
      return Localization.invalidUserNameErrorMessage;
    }

    // // First Name
    if (!firstName) {
      return Localization.emptyFirstNameErrorMessage;
    }
    if (!isValidFirstName(firstName)) {
      return Localization.invalidFirstNameErrorMessage;
    }

    // // Last Name
    if (!lastName) {
      return Localization.emptyLastNameErrorMessage;
    }
    if (!isValidLastName(lastName)) {
      return Localization.invalidLastNameErrorMessage;
    }
    // // Date of Birth
    if (!dob) {
      return Localization.emptyDobErrorMessage;
    }
    //  // // Country
    // if (!country) {
    //   return Localization.emptyCountryErrorMessage;
    // }
    // // // State
    // if (!main) {
    //   return Localization.emptyStateErrorMessage;
    // }
    // // City
    if (!city) {
      return Localization.emptyCityErrorMessage;
    }

    if (!isValidCity(city)) {
      return Localization.invalidCityErrorMessage;
    }

    // // Address
    if (!address) {
      return Localization.emptyAddressErrorMessage;
    }

    if (address.length < 5) {
      return Localization.invalidAddressErrorMessage;
    }


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
        <View style={{}}>
          <TouchableOpacity onPress={() => { this.setState({ isShowDatePicker: false }); }}>
            <Text style={{
              paddingVertical: 10, paddingHorizontal: 10, textAlign: 'right', color: 'blue',
            }}
            >
              {' '}
              DONE
            </Text>
          </TouchableOpacity>
          <DatePickerIOS
            date={this.state.dob}
            mode="date"
            onDateChange={(date) => this.setDOBDate(date)}
            maximumDate={new Date()}
          />
          <View style={[styles.cellView, { flexDirection: 'row' }]}>
            <TouchableOpacity
              onPress={() => this.updateStateDOB()}
              style={styles.okCancelButton}
            >
              {/* <Text style={styles.okCancelButtonText}>
                Ok
              </Text> */}
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

    this.setState({
      countryID: countryData.data.master_country_id,
    });
    this.props.getStateRequest(countryData.data.master_country_id);

    return this.state.countryID;
  }

  selectedStateItem(item, index, data) {
    let selectedItem = {};
    data.forEach((element) => {
      if (element.value === item) {
        selectedItem = element;
      }
    });

    this.setState({
      mainID: selectedItem.data.master_state_id,
    });
  }

  cancelButton() {
    this.props.getProfileRequest();
    Navigation.sharedInstance().pushToScreen(screenNames.HOME_SCREEN);
  }

  updateProfile() {
    const {
      firstName, lastName, mobileNumber, email, dob, username, state, city, address,
    } = this.state;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      isNetworkConnected((isConnected) => {
        const profileObject = {
          user_name: username,
          fname: firstName,
          lname: lastName,
          email,
          contact: mobileNumber,
          address,
          city,
          countryId: this.state.countryID,
          stateId: this.state.mainID,
          dob: dob.toString(),
        };
        if (isConnected) {
          this.props.updateProfileRequest(profileObject);
        }
      });
    }
  }

  onChangeusernameText(text) {
    this.setState({
      username: text,
    });
  }

  render() {
    const {
      email, firstName, lastName, mobileNumber, dob, gender, country, main,
      state, city, address, isShowDatePicker, isPopupVisible, countryId, mainID,
    } = this.state || this.props.profileResponse;
    const { dashboard } = this.props;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showRightUserImageIcon
          showRightBellImageIcon
          onPressRightIcon={() => { this.onChangeView(); }}
          showRightSideMenuImageIcon
          onPressSideMenuRightIcon={() => this.setState({ isSideMenuVisible: !this.state.isSideMenuVisible })}
        />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <HeaderAd adData={dashboard.headerAd} />
          <HeaderContainer
            userProfileImage={this.props.profileReducer.userProfileImage}
            isShowPopupDialog={() => this.isShowPopupDialog()}
            changeImageLoadingState={(boolean) => this.changeImageLoadingState(boolean)}
            imageLoading={this.state.imageLoading}
            // changeImageLoadingState={() => this.changeImageLoadingState()}
          />
          <View style={styles.subContainer}>
            <Text style={styles.personalText}>Personal Info</Text>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.usernav} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={'User Name'}
                inputKey={InputKey.firstName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={this.state.username}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeusernameText(value)}
                // onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.usernav} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.firstName}
                inputKey={InputKey.firstName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={this.state.firstName}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeFirstNameText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.usernav} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.lastName}
                inputKey={InputKey.lastName}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.emailAddress}
                value={this.state.lastName}
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
                value={this.state.email}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeEmailText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.mobileIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.SignupScreen.MobileNumber}
                inputKey={InputKey.mobileNumber}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                keyboardType={KeyboardType.phonePad}
                value={this.state.mobileNumber}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeMobileNumberText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image style={styles.emailIcon} source={images.calendar} />
              <View style={styles.dobContainer}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.updateStateDOB()}
                >
                  <Text style={[isOpenDOBPicker ? { fontSize: fontSizes.small, color: UIColors.textTitle } : { fontSize: fontSizes.small, color: UIColors.textTitle }]}>
                    {isOpenDOBPicker ? DateManager.formatDateWithDash(dob) : 'Date of Birth'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {
              // eslint-disable-next-line react/destructuring-assignment
              this.props.countryResponse && this.props.countryResponse.length > 0 && (
                <View style={[styles.textInputContainer, {}]}>
                  <Image style={styles.emailIcon} source={images.country} />
                  <View style={styles.dropdownConatiner}>
                    <Dropdown
                      fontSize={15}
                      containerStyle={styles.dropdownStyle}
                      dropdownOffset={{ top: 0, left: 0 }}
                      label={Localization.userProfileScreen.selectCountry}
                      value={this.state.country === null ? '' : this.state.country}
                      data={this.props.countryResponse}
                      onChangeText={(item, index, data) => this.selectedCountryItem(item, index, data)}
                      inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
                    />
                  </View>
                </View>
              )
            }
            {
              this.props.stateResponse && this.props.stateResponse.length > 0 && (
                <View style={[styles.textInputContainer, {}]}>
                  <Image style={styles.emailIcon} source={images.place} />
                  <View style={[styles.dropdownConatiner, {}]}>
                    <Dropdown
                      fontSize={14}
                      dropdownOffset={{ top: 0, left: 0 }}
                      containerStyle={styles.dropdownStyle}
                      label={Localization.userProfileScreen.selectState}
                    // label={Localization.userProfileScreen.selectState}
                      data={this.props.stateResponse}
                      value={this.state.main === null ? '' : this.state.main}
                      onChangeText={(item, index, data) => this.selectedStateItem(item, index, data)}
                      inputContainerStyle={{ borderBottomColor: 'transparent', justifyContent: 'center' }}
                    />
                  </View>
                </View>
              )
            }

            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.place} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.city}
                inputKey={InputKey.city}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.phonePad}
                value={this.state.city}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeCityText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={[styles.textInputContainer, {}]}>
              <Image style={styles.emailIcon} source={images.place} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.userProfileScreen.address}
                inputKey={InputKey.address}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                // keyboardType={KeyboardType.phonePad}
                value={this.state.address}
                returnKeyType={ReturnKeyType.next}
                onChangeText={(value) => this.onChangeAddressText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.updateButton} onPress={() => this.updateProfile()}>
              <Text style={styles.updateTxt}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.cancelButton()}>
              <Text style={styles.updateTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <HeaderAd adData={dashboard.footerAd} />
        </KeyboardAwareScrollView>
        {isShowDatePicker && (isIOS
          ? (
            // <Modal
            // style={{backgroundColor: 'red'}}
            //   visible={isShowDatePicker}
            //   transparent
            // >
            <View style={styles.pickerModal}>
              {this.showDOBPicker()}
            </View>
            // </Modal>
          )
          : (
            <View style={styles.pickerModal}>
              {this.showDOBPicker()}
            </View>
          ))}
        {
          this.state.isShowImagePopup
          && (
          <ChooseImagePopup
            isHaveImage={this.state.hasImage}
            isShowPopup={this.state.isShowImagePopup}
            setAvaterSource={(source, multipartBody) => this.setAvaterSource(source, multipartBody)}
            isShowPopupDialog={(isShow) => this.isShowPopupDialog(isShow)}
            imageToShow={this.state.imageToShow}
            isPortrait={this.state.isPortrait}
          />
          )
        }
        {this.props.isLoading
          && <Loader isAnimating={this.props.isLoading} />}

        {
          UserData.SessionKey && isPopupVisible
            ? (
              <PopUpScreen
                logoutAction={() => this.props.logoutRequest()}
                balance={this.props.profileResponse.balance}
                userName={this.props.profileResponse.user_name}
              />
            )
            : null
        }
        {
        this.state.isSideMenuVisible
          ? <SideMenu />
          : null
     }
      </SafeAreaView>
    );
  }
}

UserProfile.propTypes = {
  logoutRequest: PropTypes.func,
  dashboard: PropTypes.object,
};

UserProfile.defaultProps = {
  logoutRequest: () => { },
  dashboard: {},
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboardReducer,
  profileReducer: state.getProfileDataReducer,
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
