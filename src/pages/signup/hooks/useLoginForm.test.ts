import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ChangeEvent, FocusEvent } from 'react';
import { useLoginForm } from './useLoginForm';

/**
 * validator mock
 */
vi.mock('../utils/validator', () => ({
  validateEmail: vi.fn(),
  validatePassword: vi.fn(),
}));

import { validateEmail, validatePassword } from '../utils/validator';

describe('useLoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('초기화', () => {
    it('초기 form과 errors 상태를 설정한다', () => {
      const { result } = renderHook(() => useLoginForm());

      expect(result.current.form).toEqual({
        email: '',
        password: '',
      });
      expect(result.current.errors).toEqual({});
    });
  });

  describe('handleChange', () => {
    it('email 값을 변경한다', () => {
      const { result } = renderHook(() => useLoginForm());

      const mockEvent = {
        target: { value: 'test@example.com' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('email')(mockEvent);
      });

      expect(result.current.form.email).toBe('test@example.com');
    });

    it('password 값을 변경한다', () => {
      const { result } = renderHook(() => useLoginForm());

      const mockEvent = {
        target: { value: 'password123' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('password')(mockEvent);
      });

      expect(result.current.form.password).toBe('password123');
    });
  });

  describe('handleBlur', () => {
    it('email blur 시 validateEmail을 호출하고 에러를 설정한다', () => {
      vi.mocked(validateEmail).mockReturnValue(
        '이메일 형식이 올바르지 않습니다.',
      );

      const { result } = renderHook(() => useLoginForm());

      const mockEvent = {
        target: { value: 'invalid-email' },
      } as FocusEvent<HTMLInputElement>;

      act(() => {
        result.current.handleBlur('email')(mockEvent);
      });

      expect(validateEmail).toHaveBeenCalledWith('invalid-email');
      expect(result.current.errors.email).toBe(
        '이메일 형식이 올바르지 않습니다.',
      );
    });

    it('password blur 시 validatePassword를 호출하고 에러를 설정한다', () => {
      vi.mocked(validatePassword).mockReturnValue(
        '비밀번호는 6~10자 영문/숫자 조합이어야 합니다.',
      );

      const { result } = renderHook(() => useLoginForm());

      const mockEvent = {
        target: { value: '123' },
      } as FocusEvent<HTMLInputElement>;

      act(() => {
        result.current.handleBlur('password')(mockEvent);
      });

      expect(validatePassword).toHaveBeenCalledWith('123');
      expect(result.current.errors.password).toBe(
        '비밀번호는 6~10자 영문/숫자 조합이어야 합니다.',
      );
    });

    it('검증 에러가 없으면 빈 문자열을 설정한다', () => {
      vi.mocked(validateEmail).mockReturnValue('');

      const { result } = renderHook(() => useLoginForm());

      const mockEvent = {
        target: { value: 'test@example.com' },
      } as FocusEvent<HTMLInputElement>;

      act(() => {
        result.current.handleBlur('email')(mockEvent);
      });

      expect(result.current.errors.email).toBe('');
    });
  });

  describe('resetForm', () => {
    it('form과 errors를 초기 상태로 되돌린다', () => {
      vi.mocked(validateEmail).mockReturnValue(
        '이메일 형식이 올바르지 않습니다.',
      );

      const { result } = renderHook(() => useLoginForm());

      // 값 변경 + 에러 생성
      act(() => {
        result.current.handleChange('email')({
          target: { value: 'invalid' },
        } as ChangeEvent<HTMLInputElement>);
        result.current.handleBlur('email')({
          target: { value: 'invalid' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(result.current.form.email).toBe('invalid');
      expect(result.current.errors.email).toBe(
        '이메일 형식이 올바르지 않습니다.',
      );

      // reset
      act(() => {
        result.current.resetForm();
      });

      expect(result.current.form).toEqual({
        email: '',
        password: '',
      });
      expect(result.current.errors).toEqual({});
    });
  });
});
