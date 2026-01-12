import CourseCard from '@/domains/course/components/CourseCard';
import { useEnrollCourseMutation } from '@/domains/course/hooks/useEnrollCourseMutation';
import { type SortType, courseQuery } from '@/shared/apis/course';
import { Button, Header, Radio, Text } from '@/shared/components';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortType>('recent');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(courseQuery.infiniteList({ size: 10, sort }));

  const { mutate: enrollCourses } = useEnrollCourseMutation();

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Text size="lg">로딩 중...</Text>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <LoadingWrapper>
        <Text size="lg" color="secondary">
          강의 목록을 불러오는데 실패했습니다.
        </Text>
      </LoadingWrapper>
    );
  }

  const totalElements = data?.pages[0]?.totalElements ?? 0;
  const courses = data?.pages.flatMap((page) => page.content) ?? [];

  if (courses.length === 0) {
    return (
      <LoadingWrapper>
        <Text size="lg" color="secondary">
          등록된 강의가 없습니다.
        </Text>
      </LoadingWrapper>
    );
  }

  const handleSortChange = (value: string) => {
    setSort(value as SortType);
  };

  const handleEnterSelectionMode = () => {
    setIsSelectionMode(true);
    setSelectedCourseIds([]);
  };

  const handleExitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedCourseIds([]);
  };

  const handleToggleCourse = (courseId: number) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const handleEnrollSelected = () => {
    if (selectedCourseIds.length === 0) {
      alert('선택된 강의가 없습니다.');
      return;
    }

    enrollCourses(
      { courseIds: selectedCourseIds },
      {
        onSuccess: (response) => {
          const successCount = response.success.length;
          const failedCount = response.failed.length;

          let message = '';
          if (successCount > 0) {
            message += `${successCount}개의 강의 신청에 성공했습니다.`;
          }
          if (failedCount > 0) {
            message += `\n\n${failedCount}개의 강의 신청에 실패했습니다:\n`;
            response.failed.forEach((failure) => {
              message += `- ${failure.reason}\n`;
            });
          }

          alert(message);
          handleExitSelectionMode();
          refetch();
        },
        onError: (error) => {
          alert('수강 신청 중 오류가 발생했습니다.');
          console.error('Enrollment error:', error);
        },
      },
    );
  };

  const handleGoToNewCourse = () => {
    navigate({ to: '/courses/new' });
  };

  return (
    <>
      <Header
        title="강의 목록"
        right={
          <RegisterButton variant="transparent" onClick={handleGoToNewCourse}>
            +강의 등록
          </RegisterButton>
        }
      />

      {!isSelectionMode && (
        <FilterSection>
          <Radio
            label="최근 등록순"
            name="sort"
            value="recent"
            checked={sort === 'recent'}
            onChange={(e) => handleSortChange(e.target.value)}
          />
          <Radio
            label="신청자 많은순"
            name="sort"
            value="popular"
            checked={sort === 'popular'}
            onChange={(e) => handleSortChange(e.target.value)}
          />
          <Radio
            label="신청률 높은순"
            name="sort"
            value="rate"
            checked={sort === 'rate'}
            onChange={(e) => handleSortChange(e.target.value)}
          />
        </FilterSection>
      )}

      <CourseGrid>
        <Text size="sm" color="secondary">
          총 {totalElements}개의 강의
        </Text>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSelectionMode={isSelectionMode}
            isSelected={selectedCourseIds.includes(course.id)}
            onToggle={() => handleToggleCourse(course.id)}
          />
        ))}
      </CourseGrid>

      <ObserverTarget ref={observerRef} />

      {isFetchingNextPage && (
        <LoadingWrapper>
          <Text size="sm" color="secondary">
            로딩 중...
          </Text>
        </LoadingWrapper>
      )}

      <Footer>
        {!isSelectionMode ? (
          <EnrollModeButton onClick={handleEnterSelectionMode}>
            강의 신청
          </EnrollModeButton>
        ) : (
          <SelectionHeader>
            <Text size="md" weight="semibold">
              {selectedCourseIds.length}개 선택됨
            </Text>
            <ActionButtons>
              <CancelButton onClick={handleExitSelectionMode}>
                취소
              </CancelButton>
              <ConfirmButton
                onClick={handleEnrollSelected}
                disabled={selectedCourseIds.length === 0}
              >
                신청하기
              </ConfirmButton>
            </ActionButtons>
          </SelectionHeader>
        )}
      </Footer>
    </>
  );
}

const RegisterButton = styled(Button)``;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.canvas};
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-right: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const EnrollModeButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primaryStrong};
  }
`;

const SelectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.canvas};
  }
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.brand.primaryStrong};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CourseGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ObserverTarget = styled.div`
  height: 20px;
  margin: 16px 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;
