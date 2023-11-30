import addStudent from "./student/addStudent.ts";
import deleteStudent from "./student/deleteStudent.ts";
import updateStudent from "./student/updateStudent.ts";
import addInstructor from "./instructor/addInstructor.ts";
import deleteInstructor from "./instructor/deleteInstructor.ts";
import updateInstructor from "./instructor/updateInstructor.ts";
import addCourse from "./course/addCourse.ts";
import deleteCourse from "./course/deleteCourse.ts";
import updateCourse from "./course/updateCourse.ts";

const mutationResolvers = {
  Mutation: {
    ...addStudent.Mutation,
    ...deleteStudent.Mutation,
    ...updateStudent.Mutation,
    ...addInstructor.Mutation,
    ...deleteInstructor.Mutation,
    ...updateInstructor.Mutation,
    ...addCourse.Mutation,
    ...deleteCourse.Mutation,
    ...updateCourse.Mutation,
  },
};

export default mutationResolvers;
