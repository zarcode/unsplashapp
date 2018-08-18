// @flow
import { connect } from 'react-redux';
import { mapProps } from 'recompose';
import { bindActionCreators } from 'redux';

import {
  userPhotosRequested as photosRequested,
  resetUserPhotos as resetPhotos,
} from '../../action/userPhotos';
import {
  getPhotos,
  getErrorMessage,
  getIsLastPage,
  getLastLoadedPage,
  getLoadingState,
} from '../../reducers/userPhotos';
import PhotosList from '../shared/PhotosList';

const mapPropsHoc = mapProps(x => x);

export const UserPhotosList = mapPropsHoc(PhotosList);

const mapStateToProps = (state, ownProps) => ({
  photos: getPhotos(state),
  filter: ownProps.user.username,
  isLastPage: getIsLastPage(state),
  lastLoadedPage: getLastLoadedPage(state),
  loadingState: getLoadingState(state),
  getErrorMessage: getErrorMessage(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested, resetPhotos }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPhotosList);
