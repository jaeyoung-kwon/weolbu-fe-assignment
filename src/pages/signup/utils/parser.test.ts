import { describe, expect, it } from 'vitest';
import { parsePhoneNumber } from './parser';

describe('회원가입 파서 유틸', () => {
  it('휴대폰 번호를 하이픈 형식으로 변환한다', () => {
    expect(parsePhoneNumber('0101234')).toBe('010-1234');
    expect(parsePhoneNumber('01012345678')).toBe('010-1234-5678');
  });

  it('숫자 외 문자는 제거한다', () => {
    expect(parsePhoneNumber('010-12a3-4567')).toBe('010-1234-567');
  });
});
