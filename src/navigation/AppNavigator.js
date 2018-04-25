import {
  // addNavigationHelpers,
  // TabBarBottom,
  StackNavigator,
  // TabNavigator
} from 'react-navigation';
import PhotosListScreen from '../containers/PhotosListScreen';
import PhotoSingleScreen from '../containers/PhotoSingleScreen';

export const AppNavigator = StackNavigator({
  PhotosListScreen: {
    screen: PhotosListScreen,
  },
  PhotoSingleScreen: {
    screen: PhotoSingleScreen,
  },
}, {
  headerMode: 'screen',
});
