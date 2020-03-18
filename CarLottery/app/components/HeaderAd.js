import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { spacing } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  btn: {
    marginHorizontal: spacing.extraExtraSmall,
    flex: 1,
    width: '95%',
  },
  img: {
    height: 70,
    width: '100%',
    resizeMode: 'contain',
  },
});

const HeaderAd = (props) => {
  const { adData } = props;
  return (
    <View style={styles.container}>
      {adData && adData.status === '1' && (
      <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(adData.target_url)}>
        <Image source={{ uri: adData.image_adsense }} style={styles.img} />
      </TouchableOpacity>
      )}
    </View>
  );
};

HeaderAd.propTypes = {
  adData: PropTypes.object,
};

HeaderAd.defaultProps = {
  adData: {},
};

export default HeaderAd;
