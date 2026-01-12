import { describe, expect, it } from 'vitest';
import { formatDate, formatPrice } from './format';

describe('공용 포맷 유틸', () => {
  it('날짜를 한국어 형식으로 변환한다', () => {
    expect(formatDate('2024-01-02')).toBe('2024년 1월 2일');
  });

  it('가격을 콤마 형식으로 변환한다', () => {
    expect(formatPrice(10000)).toBe('10,000');
  });
});
