import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, FlatList, RefreshControl, Dimensions, ScrollView, Image,
} from 'react-native';
import { responsiveSize } from '../utils/utils';
import { spacing } from '../utils/variables';
import { images } from '../assets/images';

const styles = StyleSheet.create({
  bannerImage: {
    margin: spacing.semiMedium,
    height: responsiveSize(80),
    width: '95%',
    resizeMode: 'cover',
  },
});
const Banner = () => (
  <Image source={images.banner} style={styles.bannerImage} />
);

export default Banner;
