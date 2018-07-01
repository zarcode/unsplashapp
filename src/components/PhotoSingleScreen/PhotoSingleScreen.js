/**
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import PhotoView from 'react-native-photo-view';
import { View, StyleSheet, Image, Text } from 'react-native';
// import { Header } from 'react-navigation';
import propPath from 'crocks/Maybe/propPath';
import { getById as getUserById } from '../../reducers/users';
import type { Photo, User, PhotoID, UserID } from '../../api/types';
import IconButton from '../shared/IconButton';

const backIcon = require('../../assets/icons/arrow-back.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    flex: 1,
    width: '100%',
  },
  // topLine: {
  //   position: 'absolute',
  //   height: Header.HEIGHT,
  //   justifyContent: 'space-between',
  // },
  backButton: {
    backgroundColor: 'rgba(50, 50, 50, 0.6)',
    width: 34,
    height: 34,
    borderRadius: 17,
    marginLeft: 20,
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
  },
  userName: {
    color: 'white',
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
  avatar: string,
};

function photoViewModel(item: Photo): PhotoViewModel {
  return {
    id: propPath(['id'], item).option(''),
    url: propPath(['urls', 'full'], item).option(null),
  };
}

function userViewModel(item: User): UserViewModel {
  return {
    id: propPath(['id'], item).option(''),
    name: propPath(['name'], item).option(''),
    avatar: propPath(['profile_image', 'medium'], item).option(null),
  };
}

const navigateBack = navigation => () => navigation.goBack();

export class PhotoSingleScreen extends Component<Props> {
  static navigationOptions: (*) => *;
  componentDidMount() {
    const userVM = userViewModel(this.props.user);
    this.props.navigation.setParams({ userVM });
  }
  render() {
    const { photo } = this.props;
    const photoVM = photoViewModel(photo);
    return (
      <View style={styles.container}>
        {photoVM.url && (
          <PhotoView
            source={{
              uri: photoVM.url,
            }}
            minimumZoomScale={1}
            maximumZoomScale={3}
            androidScaleType="center"
            onLoad={() => {}}
            style={styles.imagePreview}
          />
        )}
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
      <View>
        <Text style={styles.userName}>{params.userVM.name}</Text>
        <Image
          source={{
            uri: params.userVM.avatar,
          }}
        />
      </View>
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
    // user: photo? getUser(state) : null,
    // user: !photo || getUser(state)(photo.user)
  };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoSingleScreen);
