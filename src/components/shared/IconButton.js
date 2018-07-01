// @flow
import React from 'react';
import type { Element } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type { ImageProps } from './types';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = ImageProps & {
  onPress: () => void,
  buttonStyle?: ViewStyleProp,
};

const IconButton = ({ onPress, buttonStyle, ...rest }: Props): Element<*> => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Image {...rest} />
  </TouchableOpacity>
);

export default IconButton;
