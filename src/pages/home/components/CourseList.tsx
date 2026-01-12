import CourseCard from '@/pages/home/components/CourseCard';
import { useInfiniteScroll } from '@/pages/home/hooks/useInfiniteScroll';
import { type CoursesResponse } from '@/shared/apis/course';
import { Text } from '@/shared/components';
import styled from '@emotion/styled';
import {
  type InfiniteData,
  type UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

type CourseListProps = {
  isSelectionMode: boolean;
  selectedCourseIds: number[];
  onToggleCourse: (courseId: number) => void;
} & UseSuspenseInfiniteQueryResult<
  InfiniteData<CoursesResponse, unknown>,
  Error
>;

const CourseList = ({
  isSelectionMode,
  selectedCourseIds,
  onToggleCourse,
  ...props
}: CourseListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = props;

  const { observerRef } = useInfiniteScroll({
    enabled: hasNextPage && !isFetchingNextPage,
    onReachEnd: () => fetchNextPage(),
  });

  const totalElements = data?.pages[0]?.totalElements ?? 0;
  const courses = data?.pages.flatMap((page) => page.content) ?? [];

  if (courses.length === 0) {
    return <CourseList.Empty />;
  }

  return (
    <>
      <Container>
        <Text size="sm" color="secondary">
          총 {totalElements}개의 강의
        </Text>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSelectionMode={isSelectionMode}
            isSelected={selectedCourseIds.includes(course.id)}
            onToggle={() => onToggleCourse(course.id)}
          />
        ))}
      </Container>

      <ObserverTarget ref={observerRef} />

      {isFetchingNextPage && (
        <TextWrapper>
          <Text size="sm" color="secondary">
            로딩 중...
          </Text>
        </TextWrapper>
      )}
    </>
  );
};

export default CourseList;

CourseList.Loading = () => {
  return (
    <TextWrapper>
      <Text size="lg">로딩 중...</Text>
    </TextWrapper>
  );
};

CourseList.Error = () => {
  return (
    <TextWrapper>
      <Text size="lg" color="secondary">
        강의 목록을 불러오는데 실패했습니다.
      </Text>
    </TextWrapper>
  );
};

CourseList.Empty = () => {
  return (
    <EmptyWrapper>
      <Text size="lg" color="secondary">
        등록된 강의가 없습니다.
      </Text>
    </EmptyWrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ObserverTarget = styled.div`
  height: 100px;
  margin: 16px 0;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 16px;
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 16px;
`;
