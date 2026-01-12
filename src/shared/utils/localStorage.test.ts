import { beforeEach, describe, expect, it } from 'vitest';
import { createStorage } from './localStorage';

describe('로컬 스토리지 유틸', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('기본값을 반환한다', () => {
    const storage = createStorage('test-key', '기본값');

    expect(storage.get()).toBe('기본값');
  });

  it('데이터를 저장하고 읽는다', () => {
    const storage = createStorage('test-key');

    storage.set({ name: '홍길동' });

    expect(storage.get()).toEqual({ name: '홍길동' });
  });

  it('데이터를 삭제한다', () => {
    const storage = createStorage('test-key');

    storage.set(true);
    storage.remove();

    expect(storage.get()).toBeUndefined();
  });
});
