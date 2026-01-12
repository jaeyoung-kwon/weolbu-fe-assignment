import { courseQuery } from '@/shared/apis/course';
import { Button, Footer, Header, PageLayout, Text } from '@/shared/components';
import { formatDate, formatPrice } from '@/shared/utils/format';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/courses/$courseId')({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const { data: course } = useSuspenseQuery(courseQuery.detail(courseId));

  return (
    <PageLayout hasFooter>
      <Header
        left={
          <BackButton
            variant="transparent"
            onClick={() => navigate({ to: '/' })}
          >
            ← 뒤로
          </BackButton>
        }
      />

      <TitleSection>
        <Text as="h1" size="xl" weight="bold">
          {course.title}
        </Text>
        <Text size="md" color="secondary">
          강사: {course.instructorName}
        </Text>
        <DescriptionSection>
          <Text size="lg" weight="semibold">
            강의 설명
          </Text>
          <DescriptionText>{course.description}</DescriptionText>
        </DescriptionSection>
      </TitleSection>

      <InfoSection>
        <InfoCard>
          <InfoLabel>수강료</InfoLabel>
          <Text size="xl" weight="bold" color="primary">
            {formatPrice(course.price)}원
          </Text>
        </InfoCard>

        <InfoCard>
          <InfoLabel>수강 인원</InfoLabel>
          <InfoValue>
            {course.currentStudents} / {course.maxStudents}명
          </InfoValue>
          {course.availableSeats > 0 && (
            <AvailableSeats>잔여 {course.availableSeats}석</AvailableSeats>
          )}
        </InfoCard>

        <InfoCard>
          <InfoLabel>등록일</InfoLabel>
          <InfoValue>{formatDate(course.createdAt)}</InfoValue>
        </InfoCard>
      </InfoSection>

      <Footer>
        <EnrollButton disabled={course.isFull}>
          {course.isFull ? '수강 마감' : '수강 신청'}
        </EnrollButton>
      </Footer>
    </PageLayout>
  );
}

const BackButton = styled(Button)``;

const TitleSection = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

const DescriptionSection = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const DescriptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.size.md};
  line-height: 1.6;
  white-space: pre-wrap;
`;

const InfoSection = styled.div`
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

const EnrollButton = styled(Button)`
  width: 100%;
`;
