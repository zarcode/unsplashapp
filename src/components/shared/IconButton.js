// @flow
import React from 'react';
import type { Element } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes';
import type { ImageProps } from './types';

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = ImageProps & {
  onPress: () => void,
  buttonStyle?: stylePropType,
};

const IconButton = ({ onPress, buttonStyle, ...rest }: Props): Element<*> => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Image {...rest} />
  </TouchableOpacity>
);

export default IconButton;
