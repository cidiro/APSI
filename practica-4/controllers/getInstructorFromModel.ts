import { InstructorModelType } from "../db/instructor/instructor.ts";
import { CourseModel } from "../db/course/course.ts";
import { Instructor } from "../types.ts";

export const getInstructorFromModel = async (
  instructor: InstructorModelType,
): Promise<Instructor> => {
  const { _id, name, officeHours, courseIDs } = instructor;

  const courses = await CourseModel.find({ _id: { $in: courseIDs } });

  return {
    id: _id.toString(),
    name,
    officeHours,
    courses: courses.map((instructor) => ({
      id: instructor._id.toString(),
      name: instructor.name,
      credits: instructor.credits,
    })),
  };
};
