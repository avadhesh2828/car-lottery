import { Dimensions } from 'react-native';
import _ from 'lodash';

const sizeDenominator = 850;

export function windowSize() {
  return Dimensions.get('window');
}

export function responsiveSize(fontSize) {
  const { width, height } = windowSize();
  return (Math.sqrt((height * height) + (width * width)) * (fontSize / sizeDenominator));
}

export function formateData(data, numColumns) {
  if (_.isEmpty(data)) {
    return [];
  }
  let numberOfElementsLastRow = data.length % numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({});
    numberOfElementsLastRow += 1;
  }
  return data;
}
