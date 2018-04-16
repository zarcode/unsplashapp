import axios from 'axios';
import { Api, FetchPhotosParams, Photo, PromiseCancel } from './types';
import config from '../config.json';

type Response = {data: string};

type CancelPromise = {
  cancel: (reason?: string) => void,
  promise: Promise<Response>
}

const requestGet = ({ url, params }): CancelPromise => {
  const cancelSource = axios.CancelToken.source();

  const request = {
    method: 'get',
    url,
    params: {
      ...params,
      api_key: config.client_id,
    },
    cancelToken: cancelSource.token,
  };

  const promise: Promise<Response> = axios(request);

  return {
    promise,
    cancel: cancelSource.cancel,
  };
};

class ApiIml implements Api {
  fetchPhotos = (params: FetchPhotosParams): PromiseCancel<Array<Photo>> => {
    const r = requestGet({
      url: `${config.url}/photos`,
      params,
    });

    return {
      promise: r.promise,
      cancel: r.cancel,
    };
  }
}

const api: Api = new ApiIml();

export default api;
