// @flow
import { connect } from 'react-redux';
import { mapProps } from 'recompose';
import { bindActionCreators } from 'redux';

import { photosRequested } from '../../action/photos';
import {
  getPhotos,
  getFilter,
  getErrorMessage,
  getIsLastPage,
  getLastLoadedPage,
  getLoadingState,
} from '../../reducers/photos';
import PhotosList from '../shared/PhotosList';

const mapPropsHoc = mapProps(x => x);

export const AllPhotosList = mapPropsHoc(PhotosList);

const mapStateToProps = (state) => {
  const filter = getFilter(state);
  return {
    photos: getPhotos(state),
    filter,
    isLastPage: getIsLastPage(state),
    lastLoadedPage: getLastLoadedPage(state)(filter),
    loadingState: getLoadingState(state),
    getErrorMessage: getErrorMessage(state),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllPhotosList);
