import { CourseModelType } from "../../db/course/course.ts";
import { InstructorModel, InstructorModelType } from "../../db/instructor/instructor.ts";
import { StudentModel, StudentModelType } from "../../db/student/student.ts";

export const Course = {
  instructor: async (parent: CourseModelType): Promise<InstructorModelType | null> => {
	const instructor = await InstructorModel.findOne({ _id: parent.instructorID });
	return instructor;
  },
  students: async (parent: CourseModelType): Promise<Array<StudentModelType>> => {
	const students = await StudentModel.find({ _id: { $in: parent.studentIDs } });
	return students;
  },
};
