import { useState } from 'react';

export const useCourseSelection = () => {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);

  const enterSelectionMode = () => {
    setIsSelectionMode(true);
    setSelectedCourseIds([]);
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedCourseIds([]);
  };

  const toggleCourse = (courseId: number) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  return {
    isSelectionMode,
    selectedCourseIds,
    enterSelectionMode,
    exitSelectionMode,
    toggleCourse,
  };
};
