import { Text } from '@/shared/components';
import styled from '@emotion/styled';
import { useNavigate } from '@tanstack/react-router';
import type { Course } from '../api/course.type';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleClick = () => {
    navigate({ to: '/courses/$courseId', params: { courseId: String(course.id) } });
  };

  return (
    <Card onClick={handleClick}>
      <CardTop>
        <TitleWrapper>
          <Text size="lg" weight="semibold">
            {course.title}
          </Text>
          {course.isFull && <FullBadge>마감</FullBadge>}
        </TitleWrapper>
        <Price size="lg" weight="semibold">
          {formatPrice(course.price)}원
        </Price>
      </CardTop>

      <CardBottom>
        <Text size="sm" color="secondary">
          강사명: {course.instructorName}
        </Text>
        <Text size="sm" color="secondary">
          수강인원 {course.currentStudents} / {course.maxStudents}
        </Text>
      </CardBottom>
    </Card>
  );
};

export default CourseCard;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primaryMuted};
    border-color: ${({ theme }) => theme.colors.brand.primary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const FullBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.background.disabled};
  color: ${({ theme }) => theme.colors.text.disabled};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  width: fit-content;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled(Text)`
  color: ${({ theme }) => theme.colors.brand.primary};
  flex-shrink: 0;
`;
