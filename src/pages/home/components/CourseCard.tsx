import type { Course } from '@/shared/apis/course';
import { Checkbox, Text } from '@/shared/components';
import styled from '@emotion/styled';
import { useNavigate } from '@tanstack/react-router';

interface CourseCardProps {
  course: Course;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggle?: () => void;
}

const CourseCard = ({
  course,
  isSelectionMode = false,
  isSelected = false,
  onToggle,
}: CourseCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleClick = () => {
    if (isSelectionMode) {
      onToggle?.();
    } else {
      navigate({
        to: '/courses/$courseId',
        params: { courseId: String(course.id) },
      });
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <Card onClick={handleClick} isSelectionMode={isSelectionMode}>
      {isSelectionMode && (
        <CheckboxWrapper onClick={handleCheckboxClick}>
          <Checkbox checked={isSelected} onChange={() => {}} />
        </CheckboxWrapper>
      )}
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default CourseCard;

const Card = styled.div<{ isSelectionMode: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primaryMuted};
    border-color: ${({ theme }) => theme.colors.brand.primary};
    transform: ${({ isSelectionMode }) =>
      isSelectionMode ? 'none' : 'translateY(-2px)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
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
