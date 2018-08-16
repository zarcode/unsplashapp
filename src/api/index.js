import axios from 'axios';
import { Api, FetchPhotosParams, Photo, PromiseCancel } from './types';
import { API } from '../constants';

const requestGet = ({ url, params }): PromiseCancel<Array<Photo>> => {
  const cancelSource = axios.CancelToken.source();

  const request = {
    method: 'get',
    url,
    params,
    cancelToken: cancelSource.token,
  };

  const promise: Promise<Array<Photo>> = axios(request).then(r => r.data);

  return {
    promise,
    cancel: cancelSource.cancel,
  };
};

class ApiIml implements Api {
  fetchPhotos = (params: FetchPhotosParams): PromiseCancel<Array<Photo>> =>
    requestGet({
      url: `${API.URL}/photos`,
      params,
    });
  fetchUserPhotos = ({
    username,
    ...params
  }: { username: string } & FetchPhotosParams): PromiseCancel<Array<Photo>> =>
    requestGet({
      url: `${API.URL}/users/${username}/photos`,
      params,
    });
}

const api: Api = new ApiIml();

export default api;
