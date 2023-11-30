export type Student = {
  id: string;
  name: string;
  email: string;
  major: string;
  year: number;
  courses: Array<Omit<Course, "instructor" | "students">>;
};

export type Instructor = {
  id: string;
  name: string;
  officeHours: string;
  courses: Array<Omit<Course, "instructor" | "students">>;
};

export type Course = {
  id: string;
  name: string;
  credits: number;
  instructor: Omit<Instructor, "courses"> | null;
  students: Array<Omit<Student, "courses">>;
};
