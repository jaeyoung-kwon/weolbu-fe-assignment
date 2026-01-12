import { describe, expect, it } from 'vitest';
import { formatNumber, formatPrice, parsePriceValue } from './parser';

describe('강의 등록 파서 유틸', () => {
  it('가격에 콤마를 추가한다', () => {
    expect(formatPrice('10000')).toBe('10,000');
    expect(formatPrice('1,000,000')).toBe('1,000,000');
  });

  it('콤마가 포함된 가격을 숫자로 변환한다', () => {
    expect(parsePriceValue('1,234')).toBe(1234);
  });

  it('수강 인원은 숫자만 남긴다', () => {
    expect(formatNumber('12a3')).toBe('123');
  });
});
