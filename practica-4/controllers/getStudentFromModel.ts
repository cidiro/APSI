import { StudentModelType } from "../db/student/student.ts";
import { CourseModel } from "../db/course/course.ts";
import { Student } from "../types.ts";

export const getStudentFromModel = async (
  student: StudentModelType,
): Promise<Student> => {
  const { _id, name, email, major, year, courseIDs } = student;

  const courses = await CourseModel.find({ _id: { $in: courseIDs } });

  return {
    id: _id.toString(),
    name,
    email,
    major,
    year,
    courses: courses.map((student) => ({
      id: student._id.toString(),
      name: student.name,
      credits: student.credits,
    })),
  };
};
