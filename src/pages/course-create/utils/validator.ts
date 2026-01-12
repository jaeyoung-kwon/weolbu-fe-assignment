export const validateCourseTitle = (value: string) =>
  value.trim().length > 0 ? '' : '강의명을 입력해주세요.';

export const validateCourseDescription = (value: string) =>
  value.trim().length > 0 ? '' : '강의 설명을 입력해주세요.';

export const validateCourseCapacity = (value: string) => {
  if (value.trim().length === 0) {
    return '수강 인원을 입력해주세요.';
  }

  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return '수강 인원은 숫자로 입력해주세요.';
  }

  if (numberValue < 1) {
    return '수강 인원은 1명 이상이어야 합니다.';
  }

  return '';
};

export const validateCoursePrice = (value: string) => {
  if (value.trim().length === 0) {
    return '가격을 입력해주세요.';
  }

  const numberValue = Number(value.replace(/,/g, ''));
  if (Number.isNaN(numberValue)) {
    return '가격은 숫자로 입력해주세요.';
  }

  if (numberValue < 0) {
    return '가격은 0원 이상이어야 합니다.';
  }

  return '';
};
