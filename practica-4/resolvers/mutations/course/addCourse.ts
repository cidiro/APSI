import { Course } from "../../../types.ts";
import { CourseModel } from "../../../db/course/course.ts";
import { getCourseFromModel } from "../../../controllers/getCourseFromModel.ts";

const addCourse = {
  Mutation: {
    addCourse: async (
      _: unknown,
      args: { name: string; credits: number; instructorID: string; studentIDs: string[]; }
    ): Promise<Course> => {
      const course = new CourseModel({
        name: args.name,
        credits: args.credits,
        instructorID: args.instructorID,
        studentIDs: args.studentIDs,
      });
      await course.save();
      return await getCourseFromModel(course);
    },
  },
};

export default addCourse;
