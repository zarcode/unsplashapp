import { asObservable } from './rxUtils';

describe('rx utils', () => {
  it('should make valid observable on resolve', () => {
    const promise = new Promise((resolve) => {
      resolve('test');
    });

    const promiseCancel = {
      promise,
      cancel: {},
    };

    asObservable(promiseCancel).subscribe((x) => {
      expect(x).toEqual('text');
    });
  });
});
