export type Teacher = {
  id: string;
  name: string;
  email: string;
  subjects: Array<Omit<Subject, "teacher">>;
};

export type Subject = {
  id: string;
  name: string;
  year: string;
  teacher: Omit<Teacher, "subjects">;
  students: Array<Omit<Student, "subjects">>;
};

// estudiantes tienen codigo postal y pais. cuando buscas estudiante devuelve ciudad y hora local
export type Student = {
  id: string;
  name: string;
  email: string;
  subjects: Array<Omit<Subject, "students">>;
};
