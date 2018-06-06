// @flow
import React from 'react';
import type { Element } from 'react';
import { Text, StyleSheet } from 'react-native';
import type { TextProps } from 'react-native/Libraries/Text/TextProps';

const styles = StyleSheet.create({
  appText: {
    fontSize: 16,
  },
});

export const AppText = ({ style, children, ...rest }: TextProps): Element<*> => (
  <Text {...rest} style={[styles.appText, style]}>
    {children}
  </Text>
);
