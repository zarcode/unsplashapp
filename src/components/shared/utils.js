// @flow
import { Linking, Alert } from 'react-native';

function openInBrowser(url: string) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Something went wrong', 'Please try later');
    }
  });
}

module.exports = {
  openInBrowser,
};
