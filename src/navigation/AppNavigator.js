import {
  // addNavigationHelpers,
  // TabBarBottom,
  createStackNavigator,
  // TabNavigator
} from 'react-navigation';
import PhotosListScreen from '../components/PhotosListScreen/index';
import PhotoSingleScreen from '../components/PhotoSingleScreen/PhotoSingleScreen';

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
