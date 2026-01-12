import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollLock } from './useScrollLock';

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('enabled가 true이면 body overflow를 hidden으로 설정한다', () => {
    renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('enabled가 false이면 body overflow를 초기화한다', () => {
    renderHook(() => useScrollLock(false));

    expect(document.body.style.overflow).toBe('');
  });

  it('enabled 값이 변경되면 overflow 상태도 변경된다', () => {
    const { rerender } = renderHook(({ enabled }) => useScrollLock(enabled), {
      initialProps: { enabled: false },
    });

    expect(document.body.style.overflow).toBe('');

    rerender({ enabled: true });
    expect(document.body.style.overflow).toBe('hidden');

    rerender({ enabled: false });
    expect(document.body.style.overflow).toBe('');
  });

  it('언마운트 시 overflow를 초기화한다', () => {
    const { unmount } = renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('');
  });
});
