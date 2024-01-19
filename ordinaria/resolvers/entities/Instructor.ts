import { InstructorModelType } from "../../db/instructor/instructor.ts";
import { CourseModel, CourseModelType } from "../../db/course/course.ts";

export const Instructor = {
  courses: async (parent: InstructorModelType): Promise<Array<CourseModelType>> => {
	const courses = await CourseModel.find({ _id: { $in: parent.courseIDs } });
	return courses;
  },
};
