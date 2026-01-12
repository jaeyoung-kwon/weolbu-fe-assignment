import type { Course } from '@/shared/apis/course';
import { Checkbox, Text } from '@/shared/components';
import { formatPrice } from '@/shared/utils/format';
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
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: 12px;

  display: flex;
  gap: 12px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background.surface};

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
  flex-shrink: 0;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  flex-direction: column;
`;

const CardTop = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

const FullBadge = styled.span`
  width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.background.disabled};
  color: ${({ theme }) => theme.colors.text.disabled};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled(Text)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.brand.primary};
`;
