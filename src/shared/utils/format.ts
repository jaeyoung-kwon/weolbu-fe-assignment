export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};
