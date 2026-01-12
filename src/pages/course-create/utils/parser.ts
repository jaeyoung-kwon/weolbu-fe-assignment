export const formatPrice = (value: string) => {
  const normalizedValue = value.replace(/,/g, '').replace(/\D/g, '');

  if (normalizedValue.length === 0) {
    return '';
  }

  const numberValue = Number(normalizedValue);

  if (Number.isNaN(numberValue)) {
    return '';
  }

  return new Intl.NumberFormat('ko-KR').format(numberValue);
};

export const parsePriceValue = (value: string) =>
  Number(value.replace(/,/g, ''));

export const formatNumber = (value: string) => value.replace(/\D/g, '');
