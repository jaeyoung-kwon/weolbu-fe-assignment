import type { SortType } from '@/domains/course/api/course.api';
import { courseQuery } from '@/domains/course/api/course.query';
import CourseCard from '@/domains/course/components/CourseCard';
import { Radio, Text } from '@/shared/components';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [sort, setSort] = useState<SortType>('recent');

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(courseQuery.infiniteList({ size: 10, sort }));

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
      <Page>
        <Container>
          <LoadingWrapper>
            <Text size="lg">로딩 중...</Text>
          </LoadingWrapper>
        </Container>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Container>
          <LoadingWrapper>
            <Text size="lg" color="secondary">
              강의 목록을 불러오는데 실패했습니다.
            </Text>
          </LoadingWrapper>
        </Container>
      </Page>
    );
  }

  const totalElements = data?.pages[0]?.totalElements ?? 0;
  const courses = data?.pages.flatMap((page) => page.content) ?? [];

  if (courses.length === 0) {
    return (
      <Page>
        <Container>
          <LoadingWrapper>
            <Text size="lg" color="secondary">
              등록된 강의가 없습니다.
            </Text>
          </LoadingWrapper>
        </Container>
      </Page>
    );
  }

  const handleSortChange = (value: string) => {
    setSort(value as SortType);
  };

  return (
    <Page>
      <Container>
        <Header>
          <Text as="h1" size="xl" weight="bold">
            강의 목록
          </Text>
          <Text size="sm" color="secondary">
            총 {totalElements}개의 강의
          </Text>
        </Header>

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

        <CourseGrid>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
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
      </Container>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.canvas};
`;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-right: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: 24px 16px;
`;

const Header = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.canvas};
  border-radius: 8px;
  margin-bottom: 16px;
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
