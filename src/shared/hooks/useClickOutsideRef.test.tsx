import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClickOutsideRef } from './useClickOutsideRef';

describe('useClickOutsideRef', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('ref를 반환한다', () => {
    const { result } = renderHook(() =>
      useClickOutsideRef<HTMLDivElement>(vi.fn()),
    );

    expect(result.current).toBeDefined();
    expect(result.current.current).toBe(null);
  });

  it('ref 외부를 클릭하면 callback을 호출한다', () => {
    const callback = vi.fn();

    const { result } = renderHook(() =>
      useClickOutsideRef<HTMLDivElement>(callback),
    );

    // ref에 연결할 요소 생성
    const inside = document.createElement('div');
    const outside = document.createElement('div');

    document.body.appendChild(inside);
    document.body.appendChild(outside);

    act(() => {
      result.current.current = inside;
    });

    act(() => {
      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('ref 내부를 클릭하면 callback을 호출하지 않는다', () => {
    const callback = vi.fn();

    const { result } = renderHook(() =>
      useClickOutsideRef<HTMLDivElement>(callback),
    );

    const inside = document.createElement('div');
    document.body.appendChild(inside);

    act(() => {
      result.current.current = inside;
    });

    act(() => {
      inside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('callback이 null이면 클릭해도 아무 동작을 하지 않는다', () => {
    renderHook(() => useClickOutsideRef<HTMLDivElement>(null));

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    act(() => {
      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // 에러 없이 통과하면 성공
    expect(true).toBe(true);
  });

  it('언마운트 시 이벤트 리스너가 제거된다', () => {
    const callback = vi.fn();

    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useClickOutsideRef<HTMLDivElement>(callback),
    );

    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function), true);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function), true);
  });
});
