import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ChangeEvent, FocusEvent } from 'react';
import { useSignupForm } from './useSignupForm';

/**
 * mocks
 */
vi.mock('../utils/parser', () => ({
  parsePhoneNumber: vi.fn(),
}));

vi.mock('../utils/validator', () => ({
  validateName: vi.fn(),
  validateEmail: vi.fn(),
  validatePhone: vi.fn(),
  validatePassword: vi.fn(),
}));

import { parsePhoneNumber } from '../utils/parser';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../utils/validator';

describe('useSignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('초기화', () => {
    it('초기 form과 errors 상태를 설정한다', () => {
      const { result } = renderHook(() => useSignupForm());

      expect(result.current.form).toEqual({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'instructor',
      });
      expect(result.current.errors).toEqual({});
    });
  });

  describe('handleChange', () => {
    it('name 값을 변경한다', () => {
      const { result } = renderHook(() => useSignupForm());

      const mockEvent = {
        target: { value: '홍길동' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('name')(mockEvent);
      });

      expect(result.current.form.name).toBe('홍길동');
    });

    it('email 값을 변경한다', () => {
      const { result } = renderHook(() => useSignupForm());

      const mockEvent = {
        target: { value: 'test@example.com' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('email')(mockEvent);
      });

      expect(result.current.form.email).toBe('test@example.com');
    });

    it('phone 값은 parsePhoneNumber를 거쳐 저장된다', () => {
      vi.mocked(parsePhoneNumber).mockReturnValue('01012345678');

      const { result } = renderHook(() => useSignupForm());

      const mockEvent = {
        target: { value: '010-1234-5678' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('phone')(mockEvent);
      });

      expect(parsePhoneNumber).toHaveBeenCalledWith('010-1234-5678');
      expect(result.current.form.phone).toBe('01012345678');
    });

    it('password 값을 변경한다', () => {
      const { result } = renderHook(() => useSignupForm());

      const mockEvent = {
        target: { value: 'password123' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('password')(mockEvent);
      });

      expect(result.current.form.password).toBe('password123');
    });

    it('role 값을 변경한다', () => {
      const { result } = renderHook(() => useSignupForm());

      const mockEvent = {
        target: { value: 'student' },
      } as ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange('role')(mockEvent);
      });

      expect(result.current.form.role).toBe('student');
    });
  });

  describe('handleBlur', () => {
    it('name blur 시 validateName을 호출하고 에러를 설정한다', () => {
      vi.mocked(validateName).mockReturnValue('이름을 입력해주세요.');

      const { result } = renderHook(() => useSignupForm());

      act(() => {
        result.current.handleBlur('name')({
          target: { value: '' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validateName).toHaveBeenCalledWith('');
      expect(result.current.errors.name).toBe('이름을 입력해주세요.');
    });

    it('email blur 시 validateEmail을 호출하고 에러를 설정한다', () => {
      vi.mocked(validateEmail).mockReturnValue(
        '이메일 형식이 올바르지 않습니다.',
      );

      const { result } = renderHook(() => useSignupForm());

      act(() => {
        result.current.handleBlur('email')({
          target: { value: 'invalid-email' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validateEmail).toHaveBeenCalledWith('invalid-email');
      expect(result.current.errors.email).toBe(
        '이메일 형식이 올바르지 않습니다.',
      );
    });

    it('phone blur 시 validatePhone을 호출하고 에러를 설정한다', () => {
      vi.mocked(validatePhone).mockReturnValue(
        '휴대폰 번호는 형식이 올바르지 않습니다.',
      );

      const { result } = renderHook(() => useSignupForm());

      act(() => {
        result.current.handleBlur('phone')({
          target: { value: '010123' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validatePhone).toHaveBeenCalledWith('010123');
      expect(result.current.errors.phone).toBe(
        '휴대폰 번호는 형식이 올바르지 않습니다.',
      );
    });

    it('password blur 시 validatePassword를 호출하고 에러를 설정한다', () => {
      vi.mocked(validatePassword).mockReturnValue(
        '비밀번호는 6~10자 영문/숫자 조합이어야 합니다.',
      );

      const { result } = renderHook(() => useSignupForm());

      act(() => {
        result.current.handleBlur('password')({
          target: { value: '123' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validatePassword).toHaveBeenCalledWith('123');
      expect(result.current.errors.password).toBe(
        '비밀번호는 6~10자 영문/숫자 조합이어야 합니다.',
      );
    });

    it('validator가 없는 key(role)는 blur 시 아무 동작도 하지 않는다', () => {
      const { result } = renderHook(() => useSignupForm());

      act(() => {
        result.current.handleBlur('role')({
          target: { value: 'student' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(result.current.errors).toEqual({});
    });
  });
});
