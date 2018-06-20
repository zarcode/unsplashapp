import { handleChangeFilter } from './PhotosFilters';
import { filters } from '../reducers/photos';

describe('<PhotosFilters />', () => {
  it('trigger filter actions correctly', () => {
    const props = (lastLoadedPage, currentFilter) => ({
      currentFilter,
      lastLoadedPage: () => lastLoadedPage,
      actions: {
        photosRequested: jest.fn(),
        changeFilter: jest.fn(),
      },
    });
    const propsFirstPage = props(0, filters[0].id);
    handleChangeFilter(propsFirstPage)(filters[0].id)();
    expect(propsFirstPage.actions.photosRequested.mock.calls.length).toBe(0);
    expect(propsFirstPage.actions.changeFilter.mock.calls.length).toBe(0);
    handleChangeFilter(propsFirstPage)(filters[1].id)();
    expect(propsFirstPage.actions.photosRequested.mock.calls.length).toBe(1);

    const propsNotFirstPage = props(1, filters[0].id);
    handleChangeFilter(propsNotFirstPage)(filters[1].id)();
    expect(propsNotFirstPage.actions.changeFilter.mock.calls.length).toBe(1);
  });
});
