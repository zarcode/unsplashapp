import {
  // addNavigationHelpers,
  // TabBarBottom,
  createStackNavigator,
  // TabNavigator
} from 'react-navigation';
import PhotosListScreen from '../components/PhotosListScreen';
import PhotoSingleScreen from '../components/PhotoSingleScreen';
import UserScreen from '../components/UserScreen';

const AppNavigator = createStackNavigator(
  {
    PhotosListScreen: {
      screen: PhotosListScreen,
    },
    PhotoSingleScreen: {
      screen: PhotoSingleScreen,
    },
    UserScreen: {
      screen: UserScreen,
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
