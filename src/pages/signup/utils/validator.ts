const PHONE_PATTERN = /^010-\d{4}-\d{4}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const validateName = (value: string) =>
  value.trim().length > 0 ? '' : '이름을 입력해주세요.';

export const validateEmail = (value: string) => {
  if (value.trim().length === 0) {
    return '이메일을 입력해주세요.';
  }

  if (!EMAIL_PATTERN.test(value)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  return '';
};

export const validatePhone = (value: string) => {
  if (value.trim().length === 0) {
    return '휴대폰 번호를 입력해주세요.';
  }

  if (!PHONE_PATTERN.test(value)) {
    return '휴대폰 번호는 010-1234-5678 형식이어야 합니다.';
  }

  return '';
};

export const validatePassword = (value: string) => {
  if (value.trim().length === 0) {
    return '비밀번호를 입력해주세요.';
  }

  if (!PASSWORD_PATTERN.test(value)) {
    return '비밀번호는 6~10자 영문/숫자 조합이어야 합니다.';
  }

  return '';
};
