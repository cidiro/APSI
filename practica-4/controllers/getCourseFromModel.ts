import { CourseModelType } from "../db/course/course.ts";
import { StudentModel } from "../db/student/student.ts";
import { InstructorModel } from "../db/instructor/instructor.ts";
import { Course, Instructor } from "../types.ts";

export const getCourseFromModel = async (
  course: CourseModelType,
): Promise<Course> => {
  const { _id, name, credits, instructorID, studentIDs } = course;

  let instructor : Omit<Instructor, "courses"> | null = null;
  if (instructorID) {
    const _instructor = await InstructorModel.findById(instructorID);
    if (!_instructor) throw new Error("Instructor not found");

    instructor = {
      id: _instructor._id.toString(),
      name: _instructor.name,
      officeHours: _instructor.officeHours,
    };
  }

  const students = await StudentModel.find({ _id: { $in: studentIDs } });

  return {
    id: _id.toString(),
    name,
    credits,
    instructor,
    students: students.map((student) => ({
      id: student._id.toString(),
      name: student.name,
      email: student.email,
      major: student.major,
      year: student.year,
    })),
  };
};
