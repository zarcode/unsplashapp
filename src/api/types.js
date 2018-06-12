import { PHOTOS_FILTERS } from '../constants';

export type PromiseCancel<T> = {
  promise: Promise<T>,
  cancel: (reason?: string) => void,
};

export type Photo = {
  id: string,
  created_at: string,
  updated_at: string,
  width: number,
  height: number,
  color: string,
  description: string,
  categories: Array<any>,
  user: string,
  urls: {
    raw: string,
    full: string,
    regular: string,
    small: string,
    thumb: string,
  },
  links: {
    self: string,
    html: string,
    download: string,
    download_location: string,
  },
  liked_by_user: boolean,
  sponsored: boolean,
  likes: number,
  current_user_collections: Array<any>,
};

export type User = {
  id: string,
  updated_at: string,
  username: string,
  name: string,
  first_name: string,
  last_name: string,
  twitter_username: string,
  portfolio_url: string,
  bio: string,
  location: string,
  links: {
    self: string,
    html: string,
    photos: string,
    likes: string,
    portfolio: string,
    following: string,
    followers: string,
  },
  profile_image: {
    small: string,
    medium: string,
    large: string,
  },
  total_collections: number,
  instagram_username: string,
  total_likes: number,
  total_photos: number,
};

export type FetchPhotosParams = {
  page: number,
  per_page: number,
  order_by: 'latest' | 'oldest' | 'popular',
};

export type ApiMethod<Args, R> = (args: Args) => PromiseCancel<R>;

export interface Api {
  +fetchPhotos: ApiMethod<FetchPhotosParams, Array<Photo>>;
}

export type PhotosFilter =
  | PHOTOS_FILTERS.LATEST
  | PHOTOS_FILTERS.POPULAR
  | PHOTOS_FILTERS.OLDEST;

export type Filter = {
  id: PhotosFilter,
  label: string,
};
