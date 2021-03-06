// @flow

import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import propPath from 'crocks/Maybe/propPath';
import type { User } from '../../api/types';
import UserPhotosList from './UserPhotosList';
import IconButton from '../shared/IconButton';
import { AppText } from '../shared/Typography';
import { openInBrowser } from '../shared/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  barTitle: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonWrap: {
    width: 36,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 26,
    height: 26,
    marginTop: 10,
    marginLeft: 10,
  },
  userAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginTop: 20,
    marginBottom: 7,
  },
  userName: {
    fontSize: 18,
    marginBottom: 10,
  },
  backButtonIcon: {
    tintColor: '#555555',
  },
  viewOnline: {
    borderRadius: 6,
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#777777',
    paddingHorizontal: 8,
  },
  viewOnlineLabel: {
    fontSize: 14,
  },
});

type UserViewModel = {
  name: string,
  username: string,
  avatar: string,
  link: string,
};

type Props = {
  navigation: any,
};

function userViewModel(item: User): UserViewModel {
  return {
    name: propPath(['name'], item).option(''),
    username: propPath(['username'], item).option(''),
    avatar: propPath(['profile_image', 'large'], item).option(null),
    link: propPath(['links', 'html'], item).option(null),
  };
}

const navigateBack = navigation => () => navigation.goBack();
const openLinkInBrowser = url => () => openInBrowser(url);
const backIcon = require('../../assets/icons/arrow-back.png');

const UserScreen = (props: Props) => {
  const userVM = userViewModel(propPath(['navigation', 'state', 'params', 'user'], props).option(null));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.bar}>
        <View style={styles.buttonWrap}>
          <IconButton
            onPress={navigateBack(props.navigation)}
            buttonStyle={styles.backButton}
            style={styles.backButtonIcon}
            source={backIcon}
          />
        </View>
        <View style={styles.barTitle}>
          {userVM.avatar && (
            <Image
              style={styles.userAvatar}
              source={{
                uri: userVM.avatar,
              }}
            />
          )}
        </View>
        <View style={styles.buttonWrap} />
      </View>
      <View style={styles.user}>
        <AppText style={styles.userName}>{userVM.name}</AppText>
        <TouchableOpacity
          onPress={openLinkInBrowser(userVM.link)}
          style={styles.viewOnline}
        >
          <AppText style={styles.viewOnlineLabel}>View on Unsplash</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <UserPhotosList user={userVM} navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
};

UserScreen.navigationOptions = () => ({
  header: null,
});

export default UserScreen;
