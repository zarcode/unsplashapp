/**
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import PhotoView from 'react-native-photo-view';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native';
// import { Header } from 'react-navigation';
import propPath from 'crocks/Maybe/propPath';
import { getById as getUserById } from '../../reducers/users';
import type { Photo, User, PhotoID, UserID } from '../../api/types';
import { AppText } from '../shared/Typography';
import IconButton from '../shared/IconButton';

const backIcon = require('../../assets/icons/arrow-back.png');
const loader = require('../../assets/loader.png');

const { width, height } = Dimensions.get('window');
const photoSize =
  PixelRatio.getPixelSizeForLayoutSize(Math.min(width, height)) > 1200
    ? 'full'
    : 'regular';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imagePreview: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    backgroundColor: 'rgba(50, 50, 50, 0.6)',
    width: 34,
    height: 34,
    borderRadius: 17,
    marginLeft: 10,
  },
  backButtonIcon: {
    tintColor: 'white',
  },
  headerStyle: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  user: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    marginRight: 10,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowColor: 'black',
    textShadowRadius: 1,
    fontSize: 14,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'black',
  },
  loaderContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  photo: Photo,
  user: User,
  navigation: any,
};

type PhotoViewModel = {
  id: PhotoID,
  url: string,
};

type UserViewModel = {
  id: UserID,
  name: string,
  username: string,
  avatar: string,
};

function photoViewModel(item: Photo): PhotoViewModel {
  return {
    id: propPath(['id'], item).option(''),
    url: propPath(['urls', photoSize], item).option(null),
  };
}

function userViewModel(item: User): UserViewModel {
  return {
    id: propPath(['id'], item).option(''),
    name: propPath(['name'], item).option(''),
    username: propPath(['username'], item).option(''),
    avatar: propPath(['profile_image', 'medium'], item).option(null),
  };
}

const navigateBack = navigation => () => navigation.goBack();

export class PhotoSingleScreen extends Component<Props> {
  static navigationOptions: (*) => *;
  componentDidMount() {
    const userVM = userViewModel(this.props.user);
    this.props.navigation.setParams({
      userVM,
      toUser: () =>
        userVM.username &&
        this.props.navigation.navigate('UserScreen', {
          user: this.props.user,
        }),
    });
  }
  render() {
    const { photo } = this.props;
    const photoVM = photoViewModel(photo);
    if (!photoVM.url) return null;
    return (
      <View style={styles.container}>
        <PhotoView
          key={photoVM.id}
          source={{
            uri: photoVM.url,
          }}
          minimumZoomScale={1}
          maximumZoomScale={3}
          androidScaleType="fitCenter"
          loadingIndicatorSource={loader}
          style={styles.imagePreview}
        />
      </View>
    );
  }
}

PhotoSingleScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    // header: null,
    headerStyle: styles.headerStyle,
    headerLeft: (
      <IconButton
        onPress={navigateBack(navigation)}
        buttonStyle={styles.backButton}
        style={styles.backButtonIcon}
        source={backIcon}
      />
    ),
    headerRight: params.userVM ? (
      <TouchableOpacity onPress={params.toUser} style={styles.user}>
        <AppText style={styles.userName}>{params.userVM.name}</AppText>
        {params.userVM.avatar && (
          <Image
            style={styles.userAvatar}
            source={{
              uri: params.userVM.avatar,
            }}
          />
        )}
      </TouchableOpacity>
    ) : null,
  };
};

const mapStateToProps = (state, ownProps) => {
  const photoMaybe = propPath(
    ['navigation', 'state', 'params', 'photo'],
    ownProps,
  );
  const photo = photoMaybe.option(null);
  const userId = propPath(['user'], photo);
  return {
    photo,
    user: userId.map(id => getUserById(state)(id)).option(null),
  };
};

export default connect(mapStateToProps)(PhotoSingleScreen);
