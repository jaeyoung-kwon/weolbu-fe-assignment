import { Text } from '@/shared/components';
import { formatDate, formatPrice } from '@/shared/utils/format';
import styled from '@emotion/styled';

type CourseDetailInfoProps = {
  price: number;
  currentStudents: number;
  maxStudents: number;
  availableSeats: number;
  createdAt: string;
};

const CourseDetailInfo = ({
  price,
  currentStudents,
  maxStudents,
  availableSeats,
  createdAt,
}: CourseDetailInfoProps) => {
  return (
    <Container>
      <InfoCard>
        <InfoLabel>수강료</InfoLabel>
        <Text size="xl" weight="bold" color="primary">
          {formatPrice(price)}원
        </Text>
      </InfoCard>

      <InfoCard>
        <InfoLabel>수강 인원</InfoLabel>
        <InfoValue>
          {currentStudents} / {maxStudents}명
        </InfoValue>
        {availableSeats > 0 && (
          <AvailableSeats>잔여 {availableSeats}석</AvailableSeats>
        )}
      </InfoCard>

      <InfoCard>
        <InfoLabel>등록일</InfoLabel>
        <InfoValue>{formatDate(createdAt)}</InfoValue>
      </InfoCard>
    </Container>
  );
};

export default CourseDetailInfo;

const Container = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

const InfoCard = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: 8px;

  display: flex;
  gap: 8px;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.background.canvas};
`;

const InfoLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const InfoValue = styled(Text)`
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  font-size: ${({ theme }) => theme.typography.size.lg};
`;

const AvailableSeats = styled(Text)`
  color: ${({ theme }) => theme.colors.brand.primary};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;
