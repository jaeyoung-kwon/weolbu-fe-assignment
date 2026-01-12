import { describe, expect, it } from 'vitest';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from './validator';

describe('회원가입 검증 유틸', () => {
  it('이름은 필수값이다', () => {
    expect(validateName('')).toBe('이름을 입력해주세요.');
    expect(validateName('홍길동')).toBe('');
  });

  it('이메일 형식을 검증한다', () => {
    expect(validateEmail('')).toBe('이메일을 입력해주세요.');
    expect(validateEmail('user@example.com')).toBe('');
    expect(validateEmail('invalid-email')).toBe(
      '이메일 형식이 올바르지 않습니다.',
    );
  });

  it('휴대폰 번호 형식을 검증한다', () => {
    expect(validatePhone('')).toBe('휴대폰 번호를 입력해주세요.');
    expect(validatePhone('010-1234-5678')).toBe('');
    expect(validatePhone('01012345678')).toBe(
      '휴대폰 번호는 형식이 올바르지 않습니다.',
    );
  });

  it('비밀번호 조합 규칙을 검증한다', () => {
    expect(validatePassword('')).toBe('비밀번호를 입력해주세요.');
    expect(validatePassword('abc123')).toBe('');
    expect(validatePassword('abcdef')).toBe(
      '비밀번호는 6~10자 영문/숫자 조합이어야 합니다.',
    );
  });
});
