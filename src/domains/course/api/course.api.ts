import { fetcher } from '@/lib';
import type { Course, CourseDetail } from './course.type';

export type SortType = 'recent' | 'popular' | 'rate';

export type GetCoursesParams = {
  page?: number;
  size?: number;
  sort?: SortType;
};

export type PageableInfo = {
  pageNumber: number;
  pageSize: number;
};

export type CoursesResponse = {
  content: Course[];
  pageable: PageableInfo;
  totalElements: number;
  totalPages: number;
  first: boolean;
};

export const getCourses = async (
  params: GetCoursesParams = {},
): Promise<CoursesResponse> => {
  const { page = 0, size = 10, sort = 'recent' } = params;

  return fetcher.get<CoursesResponse>({
    path: '/courses',
    query: {
      page,
      size,
      sort,
    },
  });
};

export const getCourseDetail = async (
  courseId: string,
): Promise<CourseDetail> => {
  return fetcher.get<CourseDetail>({
    path: `/courses/${courseId}`,
  });
};
