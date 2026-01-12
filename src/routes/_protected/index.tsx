import CourseList from '@/pages/home/components/CourseList';
import CourseSortFilter from '@/pages/home/components/CourseSortFilter';
import { useCourseSelection } from '@/pages/home/hooks/useCourseSelection';
import { useEnrollCourseMutation } from '@/pages/home/hooks/useEnrollCourseMutation';
import { type SortType, courseQuery } from '@/shared/apis/course';
import { Button, Footer, Header, PageLayout, Text } from '@/shared/components';
import { useAuth } from '@/shared/contexts/auth';
import styled from '@emotion/styled';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_protected/')({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sort, setSort] = useState<SortType>('recent');

  const {
    isSelectionMode,
    selectedCourseIds,
    enterSelectionMode,
    exitSelectionMode,
    toggleCourse,
  } = useCourseSelection();

  const { mutate: enrollCourses } = useEnrollCourseMutation();

  const handleEnrollSelected = () => {
    if (selectedCourseIds.length === 0) {
      alert('선택된 강의가 없습니다.');
      return;
    }

    enrollCourses(
      { courseIds: selectedCourseIds },
      { onSuccess: exitSelectionMode },
    );
  };

  return (
    <PageLayout hasFooter>
      <Header
        title="강의 목록"
        right={
          user?.role === 'INSTRUCTOR' && (
            <RegisterButton
              variant="transparent"
              onClick={() => navigate({ to: '/courses/new' })}
            >
              +강의 등록
            </RegisterButton>
          )
        }
      />

      {!isSelectionMode && <CourseSortFilter value={sort} onChange={setSort} />}

      <ErrorBoundary fallback={<CourseList.Error />}>
        <Suspense fallback={<CourseList.Loading />}>
          <SuspenseInfiniteQuery
            {...courseQuery.infiniteList({ size: 10, sort })}
          >
            {({ ...queryResult }) => (
              <CourseList
                isSelectionMode={isSelectionMode}
                selectedCourseIds={selectedCourseIds}
                onToggleCourse={toggleCourse}
                {...queryResult}
              />
            )}
          </SuspenseInfiniteQuery>
        </Suspense>
      </ErrorBoundary>

      <Footer>
        {!isSelectionMode ? (
          <EnrollModeButton onClick={enterSelectionMode}>
            강의 신청
          </EnrollModeButton>
        ) : (
          <SelectionHeader>
            <Text size="md" weight="semibold">
              {selectedCourseIds.length}개 선택됨
            </Text>
            <ActionButtons>
              <CancelButton variant="outlined" onClick={exitSelectionMode}>
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
    </PageLayout>
  );
}

const RegisterButton = styled(Button)``;

const EnrollModeButton = styled(Button)`
  width: 100%;
`;

const SelectionHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = styled(Button)``;

const ConfirmButton = styled(Button)``;
