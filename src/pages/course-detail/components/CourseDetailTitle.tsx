import { Text } from '@/shared/components';
import styled from '@emotion/styled';

type CourseDetailTitleProps = {
  title: string;
  instructorName: string;
  description: string;
};

const CourseDetailTitle = ({
  title,
  instructorName,
  description,
}: CourseDetailTitleProps) => {
  return (
    <Container>
      <Text as="h1" size="xl" weight="bold">
        {title}
      </Text>
      <Text size="md" color="secondary">
        강사: {instructorName}
      </Text>
      <DescriptionSection>
        <Text size="lg" weight="semibold">
          강의 설명
        </Text>
        <DescriptionText>{description}</DescriptionText>
      </DescriptionSection>
    </Container>
  );
};

export default CourseDetailTitle;

const Container = styled.div`
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
