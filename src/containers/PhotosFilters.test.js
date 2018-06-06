import { handleChangeFilter } from './PhotosFilters';
import { filters } from '../reducers/photos';

describe('<PhotosFilters />', () => {
  it('trigger filter actions correctly', () => {
    const props = {
      currentFilter: filters[0].id,
      lastLoadedPage: () => 0,
      actions: {
        photosRequested: jest.fn(),
        changeFilter: jest.fn(),
      },
    };

    handleChangeFilter(props)(filters[1].id)();

    expect(props.actions.changeFilter.mock.calls.length).toBe(0);
    expect(props.actions.photosRequested.mock.calls.length).toBe(1);
  });
});
