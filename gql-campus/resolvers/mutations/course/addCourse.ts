import { CourseModel, CourseModelType } from "../../../db/course/course.ts";

const addCourse = {
  Mutation: {
    addCourse: async (
      _: unknown,
      args: { name: string; credits: number; instructorID: string; studentIDs: string[]; }
    ): Promise<CourseModelType> => {
      const course = new CourseModel({
        name: args.name,
        credits: args.credits,
        instructorID: args.instructorID,
        studentIDs: args.studentIDs,
      });

      await course.save();
      return course;
    },
  },
};

export default addCourse;
