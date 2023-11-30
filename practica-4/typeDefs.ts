const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    email: String!
    major: String!
    year: Int!
    courses: [Course!]!
  }

  type Instructor {
    id: ID!
    name: String!
    officeHours: String!
    courses: [Course!]!
  }

  type Course {
    id: ID!
    name: String!
    credits: Int!
    instructor: Instructor
    students: [Student!]!
  }

  type Query {
    getStudent(id: ID!): Student!
    getStudents: [Student!]!
    filterStudents(major: String!): [Student!]!

    getInstructor(id: ID!): Instructor!
    getInstructors: [Instructor!]!

    getCourse(id: ID!): Course!
    getCourses: [Course!]!
    filterCourses(credits: Int!): [Course!]!
  }

  type Mutation {
    addStudent(name: String!, email: String!, major: String!, year: Int!): Student!
    deleteStudent(id: ID!): Student!
    updateStudent(id: ID!, name: String, email: String, major: String, year: Int): Student!

    addInstructor(name: String!, officeHours: String!): Instructor!
    deleteInstructor(id: ID!): Instructor!
    updateInstructor(id: ID!, name: String, officeHours: String): Instructor!

    addCourse(name: String!, credits: Int!): Course!
    deleteCourse(id: ID!): Course!
    updateCourse(id: ID!, name: String, credits: Int): Course!
  }
`;

export default typeDefs;
