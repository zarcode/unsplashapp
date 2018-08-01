import axios from 'axios';
import {
  Api,
  FetchPhotosParams,
  FetchUserPhotosParams,
  Photo,
  PromiseCancel,
} from './types';
import config from '../config.json';

const requestGet = ({ url, params }): PromiseCancel<Array<Photo>> => {
  const cancelSource = axios.CancelToken.source();

  const request = {
    method: 'get',
    url,
    params: {
      ...params,
      client_id: config.client_id,
    },
    cancelToken: cancelSource.token,
  };

  const promise: Promise<Array<Photo>> = axios(request).then(r => r.data);

  // return promise;

  return {
    promise,
    cancel: cancelSource.cancel,
  };
};

class ApiIml implements Api {
  fetchPhotos = (params: FetchPhotosParams): PromiseCancel<Array<Photo>> =>
    requestGet({
      url: `${config.url}/photos`,
      params,
    });
  fetchUserPhotos = ({
    username,
    ...rest
  }: { username: string } & FetchPhotosParams): PromiseCancel<Array<Photo>> =>
    requestGet({
      url: `${config.url}/users/${username}/photos`,
      rest,
    });
}

const api: Api = new ApiIml();

export default api;
