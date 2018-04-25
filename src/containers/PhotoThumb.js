// @flow
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import type { PhotoViewModel } from './PhotosList';

type Props = {
  onPress: () => void,
  photo: PhotoViewModel,
  size: number,
}
const PhotoThumb = ({ onPress, photo, size }: Props) => (
  <TouchableOpacity
    style={{
      padding: 1,
    }}
    onPress={onPress}
  >
    <Image
      style={{
        width: size,
        height: size,
      }}
      source={{
        uri: photo.url,
      }}
    />
  </TouchableOpacity>
);

export default PhotoThumb;
