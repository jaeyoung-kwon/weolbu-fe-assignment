import type { SortType } from '@/shared/apis/course';
import { Radio } from '@/shared/components';
import styled from '@emotion/styled';

interface CourseSortFilterProps {
  value: SortType;
  onChange: (value: SortType) => void;
}

const CourseSortFilter = ({ value, onChange }: CourseSortFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as SortType);
  };

  return (
    <FilterSection>
      <Radio
        label="최근 등록순"
        name="sort"
        value="recent"
        checked={value === 'recent'}
        onChange={handleChange}
      />
      <Radio
        label="신청자 많은순"
        name="sort"
        value="popular"
        checked={value === 'popular'}
        onChange={handleChange}
      />
      <Radio
        label="신청률 높은순"
        name="sort"
        value="rate"
        checked={value === 'rate'}
        onChange={handleChange}
      />
    </FilterSection>
  );
};

export default CourseSortFilter;

const FilterSection = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;

  display: flex;
  gap: 16px;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.background.canvas};
`;
