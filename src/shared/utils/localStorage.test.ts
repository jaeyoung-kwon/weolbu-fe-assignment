import { beforeEach, describe, expect, it, vi } from 'vitest';

const createLocalStorageMock = () => {
  const store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
};

describe('로컬 스토리지 유틸', () => {
  beforeEach(() => {
    const localStorage = createLocalStorageMock();

    vi.stubGlobal('window', {
      localStorage,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it('기본값을 반환한다', async () => {
    const { createStorage } = await import('./localStorage');
    const storage = createStorage('test-key', '기본값');

    expect(storage.get()).toBe('기본값');
  });

  it('데이터를 저장하고 읽는다', async () => {
    const { createStorage } = await import('./localStorage');
    const storage = createStorage('test-key');

    storage.set({ name: '홍길동' });

    expect(storage.get()).toEqual({ name: '홍길동' });
  });

  it('데이터를 삭제한다', async () => {
    const { createStorage } = await import('./localStorage');
    const storage = createStorage('test-key');

    storage.set(true);
    storage.remove();

    expect(storage.get()).toBeUndefined();
  });
});
