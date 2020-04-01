/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import base64 from 'react-native-base64';
import PropTypes from 'prop-types';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import {
  spacing, UIColors, fontSizes, fontName, itemSizes,
} from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constant';
import { isIOS } from '../../utils/plateformSpecific';
import { showPopupAlert } from '../../utils/showAlert';
import { isNetworkConnected } from '../../utils/utils';
import CustomTextInput from '../../components/CustomTextInput';
import InviteFriendList from './components/InviteFriendList';
import { isValidEmail } from '../../utils/validators';
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
    width: itemSizes.iconSmall,
    height: itemSizes.iconSmall,
    marginHorizontal: spacing.medium,
    resizeMode: 'contain',
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
    paddingVertical: spacing.semiMedium,
    paddingHorizontal: spacing.large,
    // width: itemSizes.largeWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColors.purpleButtonColor,
  },
  loginBtntxt: {
    color: UIColors.navigationTitle,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
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

class InviteFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteFriend: '',
      // isShowPassword: false,
      isSideMenuVisible: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.inviteFriendRequest(
      {
        itemsPerPage: 10,
        currentPage: 1,
      },
    );
  }

  onChangeinviteFriendText(inviteFriend) {
    this.setState({ inviteFriend });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.inviteFriend:
          this.inviteFriend;
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
      case InputKey.inviteFriend:
        this.inviteFriend = reference;
        break;
      default:
        break;
    }
  }

  getValidationErrorMessage() {
    const {
      inviteFriend,
    } = this.state;
    // Email
    if (!inviteFriend) {
      return Localization.emptyEmailErrorMessage;
    }
    if (!isValidEmail(inviteFriend)) {
      return Localization.invalidEmailErrorMessage;
    }
    return null;
  }

  InviteFriendAction() {
    const {
      inviteFriend,
    } = this.state;
    const { sendInvitationRequest } = this.props;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      isNetworkConnected((isConnected) => {
        const paramsObject = {
          list_emails: inviteFriend,
        };
        if (isConnected) {
          sendInvitationRequest(paramsObject);
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
      inviteFriend,
      isSideMenuVisible,
    } = this.state;
    const { inviteFriendReducer } = this.props;
    const { userInviteResponse } = inviteFriendReducer;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showBackButton
          showRightSideMenuImageIcon
          onPressSideMenuRightIcon={() => this.setState({ isSideMenuVisible: !isSideMenuVisible })}
        />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.subContainer}>
              <Text style={styles.loginText}>{Localization.userProfileScreen.inviteFriend}</Text>
              <View style={[styles.textInputContainer, { marginTop: spacing.large }]}>
                <Image style={styles.emailIcon} source={images.email} />
                <CustomTextInput
                  textInput={StyleSheet.flatten(styles.textInput)}
                  inputView={StyleSheet.flatten(styles.textInputView)}
                  placeholderTextColor={UIColors.defaultTextColor}
                  placeholder={Localization.loginScreen.Email}
                  inputKey={InputKey.inviteFriend}
                  getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                  keyboardType={KeyboardType.emailAddress}
                  value={inviteFriend}
                  returnKeyType={ReturnKeyType.next}
                  onChangeText={(value) => this.onChangeinviteFriendText(value)}
                  onSubmitEditing={(key) => this.onSubmitEditing(key)}
                  autoCapitalize="none"
                />
                {/* <ToggleIcon
                isShowPassword={isShowPassword}
                showPassowrdText={() => this.showPassowrdText()}
                // screenOrientation={screenOrientation}
              /> */}
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={() => this.InviteFriendAction()}>
                <Text style={styles.loginBtntxt}>{Localization.userProfileScreen.invite}</Text>
              </TouchableOpacity>
            </View>
            <InviteFriendList
              userInviteResponse={userInviteResponse}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
        {
       isSideMenuVisible
         ? <SideMenu />
         : null
     }
      </SafeAreaView>
    );
  }
}


InviteFriend.propTypes = {
  inviteFriendRequest: PropTypes.func,
  logoutRequest: PropTypes.func,
  inviteFriendReducer: PropTypes.object,
};

InviteFriend.defaultProps = {
  inviteFriendRequest: () => {},
  logoutRequest: () => {},
  inviteFriendReducer: {},
};


const mapStateToProps = (state) => ({
  inviteFriendReducer: state.getInviteFriendReducer,
  inviteFriendResponse: state.getInviteFriendReducer.userInviteResponse,
  inviteFriendisLoading: state.getInviteFriendReducer.isLoading,
});

const mapDispatchToProps = () => UserActions;

const InviteFriendScreen = connect(mapStateToProps, mapDispatchToProps)(InviteFriend);

export default InviteFriendScreen;
