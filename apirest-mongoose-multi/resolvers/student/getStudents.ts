// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Student } from "../../types.ts";

import { StudentModel } from "../../db/student/student.ts";
import { getStudentFromModel } from "../../controllers/getStudentFromModel.ts";

export const getStudents = async (
  _req: Request,
  res: Response<Student[] | { error: unknown }>
) => {
  try {
    const students = await StudentModel.find({}).exec();
    const studentsResponse: Student[] = await Promise.all(
      students.map((student) => getStudentFromModel(student))
    );
    res.status(200).json(studentsResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
