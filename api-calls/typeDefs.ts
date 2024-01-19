const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    email: String!
    major: String!
    year: Int!
    courses: [Course!]
  }

  type Instructor {
    id: ID!
    name: String!
    email: String!
    officeHours: String!
    courses: [Course!]
  }

  type Course {
    id: ID!
    name: String!
    credits: Int!
    cityQuality: CityQuality!
    instructor: Instructor
    students: [Student!]
  }

  type Weather {
    temperature: Float!
    feelsLike: Float!
  }

  type CityQuality {
    temperature: Float!
    feelsLike: Float!
    CO2: Float!
    overallAQI: Int!
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
    addStudent(name: String!, email: String!, major: String!, year: Int!, courseIDs: [ID!]): Student!
    updateStudent(id: ID!, name: String, email: String, major: String, year: Int, courseIDs: [ID!]): Student!
    deleteStudent(id: ID!): Student!

    addInstructor(name: String!, email: String!, officeHours: String!, courseIDs: [ID!]): Instructor!
    updateInstructor(id: ID!, name: String, email: String, officeHours: String, courseIDs: [ID!]): Instructor!
    deleteInstructor(id: ID!): Instructor!

    addCourse(name: String!, credits: Int!, instructorID: ID, studentIDs: [ID!]): Course!
    updateCourse(id: ID!, name: String, credits: Int, instructorID: ID, studentIDs: [ID!]): Course!
    deleteCourse(id: ID!): Course!
  }
`;

export default typeDefs;
