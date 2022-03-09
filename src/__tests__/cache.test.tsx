import { ref } from 'vue-demi';

import type { CacheData, CacheResultType } from '../core/utils/cache';
import { clearCache, getCache, setCache } from '../core/utils/cache';
import { waitForTime } from './utils';

describe('utils', () => {
  const cacheKey = 'test';
  const cacheData: CacheResultType = {
    data: ref(1),
    time: new Date().getTime(),
  };
  beforeAll(() => {
    jest.useFakeTimers();
    clearCache();
  });

  test('setCache and getCache should work', () => {
    setCache(cacheKey, 10000, cacheData);
    const data = getCache(cacheKey);
    expect(data?.data).toMatchObject(cacheData);
  });

  test('cacheTime should work', async () => {
    setCache(cacheKey, 10000, cacheData);
    expect(getCache(cacheKey)?.data).toMatchObject(cacheData);
    await waitForTime(5000);
    setCache(cacheKey, 10000, cacheData);
    await waitForTime(5000);
    expect(getCache(cacheKey)?.data).toMatchObject(cacheData);
    await waitForTime(5000);
    expect(getCache(cacheKey)).toBeUndefined();
  });

  test('clearCache should work', async () => {
    setCache(cacheKey, 10000, cacheData);
    expect(getCache(cacheKey)?.data).toMatchObject(cacheData);
    clearCache();
    expect(getCache(cacheKey)?.data).toBeUndefined();
  });

  test('clear a single cache should work', async () => {
    const cache1 = '1';
    const cache2 = '2';
    setCache(cache1, 10000, cacheData);
    setCache(cache2, 10000, cacheData);
    expect(getCache(cache1)?.data).toMatchObject(cacheData);
    expect(getCache(cache2)?.data).toMatchObject(cacheData);
    clearCache(cache1);
    expect(getCache(cache1)?.data).toBeUndefined();
    expect(getCache(cache2)?.data).toMatchObject(cacheData);
  });
});
