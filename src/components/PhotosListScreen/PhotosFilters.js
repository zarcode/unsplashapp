// @flow
import { mapProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Filters from '../shared/Filters';
import type { FiltersProps } from '../shared/Filters';
import { getFilter, getLastLoadedPage, filters } from '../../reducers/photos';
import { photosRequested, changeFilter } from '../../action/photos';
import type { PhotosFilter } from '../../api/types';

type Props = {
  currentFilter: string,
  lastLoadedPage: (filterId: PhotosFilter) => number,
  actions: {
    photosRequested: (filterId: PhotosFilter, refresh: boolean) => void,
    changeFilter: (filterId: PhotosFilter) => void,
  },
};

/**
 *  Change filter
 * @param {string} filterId
 * @returns {function()}
 */
export const handleChangeFilter = ({
  currentFilter,
  lastLoadedPage,
  actions,
}: Props) => (filterId: string) => () => {
  if (filterId !== currentFilter) {
    if (lastLoadedPage(filterId) === 0) {
      actions.photosRequested(filterId, true);
    } else {
      actions.changeFilter(filterId);
    }
  }
};

const buildFilterProps = (props: Props): FiltersProps => ({
  onFilterSelect: handleChangeFilter(props),
  currentFilter: props.currentFilter,
  allFilters: filters,
});

const mapPropsHoc = mapProps(buildFilterProps);

export const PhotosFilters = mapPropsHoc(Filters);

const mapStateToProps = state => ({
  currentFilter: getFilter(state),
  lastLoadedPage: getLastLoadedPage(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested, changeFilter }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosFilters);
