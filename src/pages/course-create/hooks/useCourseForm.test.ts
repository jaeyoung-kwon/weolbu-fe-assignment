import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ChangeEvent, FocusEvent } from 'react';
import { useCourseForm } from './useCourseForm';

/**
 * mocks
 */
vi.mock('../utils/parser', () => ({
  formatPrice: vi.fn(),
  formatNumber: vi.fn(),
}));

vi.mock('../utils/validator', () => ({
  validateCourseTitle: vi.fn(),
  validateCourseDescription: vi.fn(),
  validateCourseCapacity: vi.fn(),
  validateCoursePrice: vi.fn(),
}));

import { formatPrice, formatNumber } from '../utils/parser';
import {
  validateCourseTitle,
  validateCourseDescription,
  validateCourseCapacity,
  validateCoursePrice,
} from '../utils/validator';

describe('useCourseForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('초기화', () => {
    it('초기 form과 errors 상태를 설정한다', () => {
      const { result } = renderHook(() => useCourseForm());

      expect(result.current.form).toEqual({
        title: '',
        description: '',
        capacity: '',
        price: '',
      });
      expect(result.current.errors).toEqual({});
    });
  });

  describe('handleChange', () => {
    it('title 값을 변경한다', () => {
      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleChange('title')({
          target: { value: 'React 강의' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.form.title).toBe('React 강의');
    });

    it('description 값을 변경한다', () => {
      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleChange('description')({
          target: { value: '기초부터 실습까지' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.form.description).toBe('기초부터 실습까지');
    });

    it('capacity 값은 formatNumber를 거쳐 저장된다', () => {
      vi.mocked(formatNumber).mockReturnValue('100');

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleChange('capacity')({
          target: { value: '1,00' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formatNumber).toHaveBeenCalledWith('1,00');
      expect(result.current.form.capacity).toBe('100');
    });

    it('price 값은 formatPrice를 거쳐 저장된다', () => {
      vi.mocked(formatPrice).mockReturnValue('10,000');

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleChange('price')({
          target: { value: '10000' },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(formatPrice).toHaveBeenCalledWith('10000');
      expect(result.current.form.price).toBe('10,000');
    });
  });

  describe('handleBlur', () => {
    it('title blur 시 validateCourseTitle을 호출하고 에러를 설정한다', () => {
      vi.mocked(validateCourseTitle).mockReturnValue('강의명을 입력해주세요.');

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleBlur('title')({
          target: { value: '' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validateCourseTitle).toHaveBeenCalledWith('');
      expect(result.current.errors.title).toBe('강의명을 입력해주세요.');
    });

    it('description blur 시 validateCourseDescription을 호출한다', () => {
      vi.mocked(validateCourseDescription).mockReturnValue(
        '강의 설명을 입력해주세요.',
      );

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleBlur('description')({
          target: { value: '' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validateCourseDescription).toHaveBeenCalledWith('');
      expect(result.current.errors.description).toBe(
        '강의 설명을 입력해주세요.',
      );
    });

    it('capacity blur 시 validateCourseCapacity를 호출한다', () => {
      vi.mocked(validateCourseCapacity).mockReturnValue(
        '수강 인원을 입력해주세요.',
      );

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleBlur('capacity')({
          target: { value: '' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validateCourseCapacity).toHaveBeenCalledWith('');
      expect(result.current.errors.capacity).toBe('수강 인원을 입력해주세요.');
    });

    it('price blur 시 validateCoursePrice를 호출한다', () => {
      vi.mocked(validateCoursePrice).mockReturnValue('가격을 입력해주세요.');

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleBlur('price')({
          target: { value: '' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(validateCoursePrice).toHaveBeenCalledWith('');
      expect(result.current.errors.price).toBe('가격을 입력해주세요.');
    });

    it('검증 에러가 없으면 빈 문자열을 설정한다', () => {
      vi.mocked(validateCourseTitle).mockReturnValue('');

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleBlur('title')({
          target: { value: 'React 강의' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(result.current.errors.title).toBe('');
    });
  });

  describe('validateForm', () => {
    it('모든 필드가 유효하면 true를 반환한다', () => {
      vi.mocked(validateCourseTitle).mockReturnValue('');
      vi.mocked(validateCourseDescription).mockReturnValue('');
      vi.mocked(validateCourseCapacity).mockReturnValue('');
      vi.mocked(validateCoursePrice).mockReturnValue('');

      const { result } = renderHook(() => useCourseForm());

      let isValid = false;
      act(() => {
        isValid = result.current.validateForm();
      });

      expect(isValid).toBe(true);
      expect(result.current.errors).toEqual({});
    });

    it('에러가 있으면 errors를 설정하고 false를 반환한다', () => {
      vi.mocked(validateCourseTitle).mockReturnValue('강의명을 입력해주세요.');
      vi.mocked(validateCourseDescription).mockReturnValue('');
      vi.mocked(validateCourseCapacity).mockReturnValue(
        '수강 인원을 입력해주세요.',
      );
      vi.mocked(validateCoursePrice).mockReturnValue('');

      const { result } = renderHook(() => useCourseForm());

      let isValid = true;
      act(() => {
        isValid = result.current.validateForm();
      });

      expect(isValid).toBe(false);
      expect(result.current.errors).toEqual({
        title: '강의명을 입력해주세요.',
        capacity: '수강 인원을 입력해주세요.',
      });
    });
  });

  describe('resetForm', () => {
    it('form과 errors를 초기 상태로 되돌린다', () => {
      vi.mocked(validateCourseTitle).mockReturnValue('강의명을 입력해주세요.');

      const { result } = renderHook(() => useCourseForm());

      act(() => {
        result.current.handleChange('title')({
          target: { value: '' },
        } as ChangeEvent<HTMLInputElement>);
        result.current.handleBlur('title')({
          target: { value: '' },
        } as FocusEvent<HTMLInputElement>);
      });

      expect(result.current.errors.title).toBe('강의명을 입력해주세요.');

      act(() => {
        result.current.resetForm();
      });

      expect(result.current.form).toEqual({
        title: '',
        description: '',
        capacity: '',
        price: '',
      });
      expect(result.current.errors).toEqual({});
    });
  });
});
