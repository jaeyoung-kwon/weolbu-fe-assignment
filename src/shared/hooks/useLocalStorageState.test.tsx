import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from './useLocalStorageState';

describe('useLocalStorageState', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('초기화', () => {
    it('localStorage에 값이 없으면 defaultValue를 사용한다', () => {
      const { result } = renderHook(() =>
        useLocalStorageState('test-key', 'default'),
      );

      const [value] = result.current;

      expect(value).toBe('default');
    });

    it('localStorage에 값이 있으면 해당 값을 사용한다', () => {
      localStorage.setItem('test-key', JSON.stringify('stored'));

      const { result } = renderHook(() =>
        useLocalStorageState('test-key', 'default'),
      );

      const [value] = result.current;

      expect(value).toBe('stored');
    });
  });

  describe('setValue', () => {
    it('값을 직접 설정하면 state와 localStorage가 함께 변경된다', () => {
      const { result } = renderHook(() =>
        useLocalStorageState<'initial' | 'next'>('test-key', 'initial'),
      );

      const [, setValue] = result.current;

      act(() => {
        setValue('next');
      });

      const [value] = result.current;

      expect(value).toBe('next');
      expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('next');
    });

    it('updater 함수를 지원한다', () => {
      const { result } = renderHook(() =>
        useLocalStorageState<number>('count', 1),
      );

      const [, setValue] = result.current;

      act(() => {
        setValue((prev) => prev + 1);
      });

      const [value] = result.current;

      expect(value).toBe(2);
      expect(JSON.parse(localStorage.getItem('count')!)).toBe(2);
    });

    it('null을 설정하면 localStorage에서 값을 제거한다', () => {
      const { result } = renderHook(() =>
        useLocalStorageState<string | null>('test-key', 'initial'),
      );

      const [, setValue] = result.current;

      act(() => {
        setValue(null);
      });

      const [value] = result.current;

      expect(value).toBe(null);
      expect(localStorage.getItem('test-key')).toBe(null);
    });
  });

  describe('storage 이벤트 동기화', () => {
    it('storage 이벤트가 발생하면 값이 동기화된다', () => {
      const { result } = renderHook(() =>
        useLocalStorageState('sync-key', 'initial'),
      );

      act(() => {
        localStorage.setItem('sync-key', JSON.stringify('updated'));

        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'sync-key',
            newValue: JSON.stringify('updated'),
          }),
        );
      });

      const [value] = result.current;

      expect(value).toBe('updated');
    });

    it('다른 key의 storage 이벤트에는 반응하지 않는다', () => {
      const { result } = renderHook(() =>
        useLocalStorageState('my-key', 'initial'),
      );

      act(() => {
        localStorage.setItem('other-key', JSON.stringify('changed'));

        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'other-key',
            newValue: JSON.stringify('changed'),
          }),
        );
      });

      const [value] = result.current;

      expect(value).toBe('initial');
    });
  });

  describe('이벤트 정리', () => {
    it('언마운트 시 storage 이벤트 리스너를 제거한다', () => {
      const addSpy = vi.spyOn(window, 'addEventListener');
      const removeSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() =>
        useLocalStorageState('cleanup-key', 'value'),
      );

      expect(addSpy).toHaveBeenCalledWith('storage', expect.any(Function));

      unmount();

      expect(removeSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    });
  });
});
