import { describe, expect, it } from 'vitest';
import {
  validateCourseCapacity,
  validateCourseDescription,
  validateCoursePrice,
  validateCourseTitle,
} from './validator';

describe('강의 등록 검증 유틸', () => {
  it('강의명은 필수로 입력한다', () => {
    expect(validateCourseTitle('')).toBe('강의명을 입력해주세요.');
    expect(validateCourseTitle('리액트 기초')).toBe('');
  });

  it('강의 설명은 필수로 입력한다', () => {
    expect(validateCourseDescription('')).toBe('강의 설명을 입력해주세요.');
    expect(validateCourseDescription('설명')).toBe('');
  });

  it('수강 인원은 1명 이상 숫자만 허용한다', () => {
    expect(validateCourseCapacity('')).toBe('수강 인원을 입력해주세요.');
    expect(validateCourseCapacity('0')).toBe(
      '수강 인원은 1명 이상이어야 합니다.',
    );
    expect(validateCourseCapacity('10')).toBe('');
  });

  it('가격은 0원 이상 숫자만 허용한다', () => {
    expect(validateCoursePrice('')).toBe('가격을 입력해주세요.');
    expect(validateCoursePrice('1,000')).toBe('');
    expect(validateCoursePrice('-1')).toBe('가격은 0원 이상이어야 합니다.');
    expect(validateCoursePrice('가격')).toBe('가격은 숫자로 입력해주세요.');
  });
});
