import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getCourses, type GetCoursesParams } from './course.api';

export const courseQuery = {
  list: (params: GetCoursesParams) =>
    queryOptions({
      queryKey: ['courses', params],
      queryFn: () => getCourses(params),
    }),
  infiniteList: (params: Omit<GetCoursesParams, 'page'>) =>
    infiniteQueryOptions({
      queryKey: ['courses', 'infinite', params],
      queryFn: ({ pageParam = 0 }) =>
        getCourses({ ...params, page: pageParam, size: params.size ?? 10 }),
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.pageable.pageNumber + 1;
        return nextPage < lastPage.totalPages ? nextPage : undefined;
      },
      initialPageParam: 0,
    }),
};
