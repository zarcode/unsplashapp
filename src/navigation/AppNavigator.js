import {
  // addNavigationHelpers,
  // TabBarBottom,
  createStackNavigator,
  // TabNavigator
} from 'react-navigation';
import PhotosListScreen from '../containers/PhotosListScreen';
import PhotoSingleScreen from '../containers/PhotoSingleScreen';

const AppNavigator = createStackNavigator(
  {
    PhotosListScreen: {
      screen: PhotosListScreen,
    },
    PhotoSingleScreen: {
      screen: PhotoSingleScreen,
    },
  },
  {
    headerMode: 'screen',
    cardStyle: {
      shadowColor: 'transparent',
    },
  },
);

export default AppNavigator;
