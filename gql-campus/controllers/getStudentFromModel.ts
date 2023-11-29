import { StudentModelType } from "../db/student/student.ts";
import { SubjectModel } from "../db/subject/subject.ts";
import { Student } from "../types.ts";

export const getStudentFromModel = async (
  student: StudentModelType,
): Promise<Student> => {
  const { _id, name, email, subjectsID } = student;

  const subjects = await SubjectModel.find({ _id: { $in: subjectsID } });

  return {
    id: _id.toString(),
    name,
    email,
    subjects: subjects.map((student) => ({
      id: student._id.toString(),
      name: student.name,
      year: student.year,
    })),
  };
};
