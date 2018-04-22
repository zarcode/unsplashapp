// @flow
import { mapProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Filters from '../shared/Filters';
import type { FiltersProps } from '../shared/Filters';
import { getFilter, filters } from '../reducers/photos';
import { photosRequested } from '../action/photos';
import type { PhotosFilter } from '../api/types';

type Props = {
  currentFilter: string,
  actions: {
    photosRequested: (filterId: PhotosFilter) => void
  }
}

/**
 *  Change filter
 * @param {string} filterId
 * @returns {function()}
 */
const changeFilter = ({ currentFilter, actions }: Props) => (filterId: string) => () => {
  if (filterId !== currentFilter) {
    actions.photosRequested(filterId);
  }
};

const buildFilterProps = (props: Props): FiltersProps => ({
  onFilterSelect: changeFilter(props),
  currentFilter: props.currentFilter,
  allFilters: filters,
})

const mapPropsHoc = mapProps(buildFilterProps);

const PhotosFilters = mapPropsHoc(Filters);

const mapStateToProps = state => ({
  currentFilter: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ photosRequested }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosFilters);
