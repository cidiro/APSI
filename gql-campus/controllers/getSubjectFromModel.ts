import { SubjectModelType } from "../db/subject/subject.ts";
import { StudentModel } from "../db/student/student.ts";
import { TeacherModel } from "../db/teacher/teacher.ts";
import { Subject, Teacher } from "../types.ts";

export const getSubjectFromModel = async (
  subject: SubjectModelType,
): Promise<Subject> => {
  const { _id, name, year, teacherID, studentsID } = subject;

  let teacher : Omit<Teacher, "subjects"> | null = null;
  if (teacherID) {
    const _teacher = await TeacherModel.findById(teacherID);
    if (!_teacher) throw new Error("Teacher not found");

    teacher = {
      id: _teacher._id.toString(),
      name: _teacher.name,
      email: _teacher.email,
    };
  }

  const students = await StudentModel.find({ _id: { $in: studentsID } });

  return {
    id: _id.toString(),
    name,
    year,
    teacher,
    students: students.map((student) => ({
      id: student._id.toString(),
      name: student.name,
      email: student.email,
    })),
  };
};
