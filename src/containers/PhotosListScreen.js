// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import PhotoSingleScreen from './PhotoSingleScreen';
import { photosRequested } from '../action/photos';
import { getPhotos, getErrorMessage, getIsFetching } from '../reducers/photos';
// import {List} from "immutable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  navigation: any,
  photos: any, // todo
  actions: {
    photosRequested: () => void
  }
};

type State = {
  numColumns: number,
  imageDim: number,
};

class PhotosList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      numColumns: 3,
      imageDim: Math.floor(Dimensions.get('window').width / 3),
    };
  }
  state: State;
  componentDidMount() {
    this.props.actions.photosRequested();
  }
  onPress = () => {}
  onLayout = () => {
    const { width, height } = Dimensions.get('window');
    if (width > height) {
      this.setState({ numColumns: 5, imageDim: Math.floor(width / 5) });
    } else {
      this.setState({ numColumns: 3, imageDim: Math.floor(width / 3) });
    }
  }
  photoViewModel = item => ({
    id: item.id,
    url: item.urls.small,
  });
  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const photo = this.photoViewModel(item);
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Image
          style={{
            width: this.state.imageDim,
            height: this.state.imageDim,
          }}
          source={{
            uri: photo.url,
          }}
        />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}
      >

        <TouchableOpacity
          onPress={() => this.props.navigation.dispatch({ type: 'PhotoSingleScreen' })}
        >
          <Text>To single</Text>
        </TouchableOpacity>
        <FlatList
          key={this.state.numColumns}
          numColumns={this.state.numColumns}
          data={this.props.photos}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

PhotosList.propTypes = {
  actions: PropTypes.shape({
    photosRequested: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  photos: getPhotos(state.photos),
  isFetching: getIsFetching(state.photos),
  getErrorMessage: getErrorMessage(state.photos),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
