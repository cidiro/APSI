// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Teacher } from "../../types.ts";

import { TeacherModel, TeacherModelType } from "../../db/teacher/teacher.ts";
import { getTeacherFromModel } from "../../controllers/getTeacherFromModel.ts";

export const postTeacher = async (
  req: Request<{}, {}, TeacherModelType>,
  res: Response<Teacher | { error: unknown }>
) => {
  try {
    const { name, email, subjectsID } = req.body;
    const teacher = new TeacherModel({
      name,
      email,
      subjectsID,
    });
    await teacher.save();

    const teacherResponse: Teacher = await getTeacherFromModel(teacher);

    res.status(201).json(teacherResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
