/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, TextInput,
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
import { isNetworkConnected, responsiveSize } from '../../utils/utils';
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
    height: isIOS ? responsiveSize(150) : responsiveSize(100),
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
  textInputStyle: {
    height: isIOS ? responsiveSize(150) : responsiveSize(100),
    color: UIColors.textTitle,
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
  },
});

class DisputeReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      // isShowPassword: false,
      isSideMenuVisible: false,
    };
  }


  onChangeText(reason) {
    this.setState({ reason });
  }


  DisputeReasonAction() {
    const { item } = this.props.navigation.state.params;
    this.props.disputeRequest({
      dispute_reason: this.state.reason,
      contest_unique_id: item.contest_unique_id,
    });
  }

  render() {
    // const {
    //   screenOrientation,
    //   facebookAction,
    //   googleAction,
    // } = this.props;
    const {
      reason,
      isSideMenuVisible,
    } = this.state;
    const { item } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <NavigationHeader
          logo
          showBackButton
          showRightSideMenuImageIcon
          onPressSideMenuRightIcon={() => this.setState({ isSideMenuVisible: !isSideMenuVisible })}
        />
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.subContainer}>
            <Text style={styles.loginText}>{Localization.DisputeReason.DisputeReason}</Text>
            <View style={[styles.textInputContainer, { marginTop: spacing.large }]}>
              {/* <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={Localization.DisputeReason.DisputeReason}
                inputKey={InputKey.oldPassword}
                getTextInputReference={(key, reference) => this.getTextInputReference(key, reference)}
                value={oldPassword}
                onChangeText={(value) => this.onChangeOldPasswordText(value)}
                onSubmitEditing={(key) => this.onSubmitEditing(key)}
                multiline
              /> */}
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.textInputStyle}
                placeholder={Localization.DisputeReason.DisputeReason}
                placeholderTextColor={UIColors.grayText}
                onChangeText={(text) => this.onChangeText(text)}
                clearButtonMode={'always'}
                value={reason}
                multiline
                numberOfLines={5}
              />
              {/* <ToggleIcon
                isShowPassword={isShowPassword}
                showPassowrdText={() => this.showPassowrdText()}
                // screenOrientation={screenOrientation}
              /> */}
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={(item) => this.DisputeReasonAction(item)}>
              <Text style={styles.loginBtntxt}>{Localization.DisputeReason.Submit}</Text>
            </TouchableOpacity>
          </View>
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = () => UserActions;

const DisputeReasonScreen = connect(mapStateToProps, mapDispatchToProps)(DisputeReason);

export default DisputeReasonScreen;
