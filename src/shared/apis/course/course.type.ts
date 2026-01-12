export type Course = {
  id: number;
  title: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
};

export type CourseDetail = {
  description: string;
} & Course;
