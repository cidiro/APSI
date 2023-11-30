import getStudent from "./student/getStudent.ts";
import getStudents from "./student/getStudents.ts";
import filterStudents from "./student/filterStudents.ts";
import getInstructor from "./instructor/getInstructor.ts";
import getInstructors from "./instructor/getInstructors.ts";
import getCourse from "./course/getCourse.ts";
import getCourses from "./course/getCourses.ts";
import filterCourses from "./course/filterCourses.ts";

const queryResolvers = {
  Query: {
    ...getStudent.Query,
    ...getStudents.Query,
    ...filterStudents.Query,
    ...getInstructor.Query,
    ...getInstructors.Query,
    ...getCourse.Query,
    ...getCourses.Query,
    ...filterCourses.Query,
  },
};

export default queryResolvers;
