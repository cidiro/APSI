// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { postStudent } from "./resolvers/student/postStudent.ts";
import { putStudent } from "./resolvers/student/putStudent.ts";
import { deleteStudent } from "./resolvers/student/deleteStudent.ts";
import { getStudents } from "./resolvers/student/getStudents.ts";
import { getStudent } from "./resolvers/student/getStudent.ts";

import { postTeacher } from "./resolvers/teacher/postTeacher.ts";
import { putTeacher } from "./resolvers/teacher/putTeacher.ts";
import { deleteTeacher } from "./resolvers/teacher/deleteTeacher.ts";
import { getTeachers } from "./resolvers/teacher/getTeachers.ts";
import { getTeacher } from "./resolvers/teacher/getTeacher.ts";

import { postSubject } from "./resolvers/subject/postSubject.ts";
import { putSubject } from "./resolvers/subject/putSubject.ts";
import { deleteSubject } from "./resolvers/subject/deleteSubject.ts";
import { getSubjects } from "./resolvers/subject/getSubjects.ts";
import { getSubject } from "./resolvers/subject/getSubject.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/teachers", getTeachers)
  .get("/students", getStudents)
  .get("/subjects", getSubjects)
  .get("/teacher/:id", getTeacher)
  .get("/student/:id", getStudent)
  .get("/subject/:id", getSubject)
  .post("/teacher", postTeacher)
  .post("/student", postStudent)
  .post("/subject", postSubject)
  .put("/teacher/:id", putTeacher)
  .put("/student/:id", putStudent)
  .put("/subject/:id", putSubject)
  .delete("/teacher/:id", deleteTeacher)
  .delete("/student/:id", deleteStudent)
  .delete("/subject/:id", deleteSubject);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
