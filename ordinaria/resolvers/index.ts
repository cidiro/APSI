import addContact from "./mutations/addContact.ts"
import updateContact from "./mutations/updateContact.ts";
import deleteContact from "./mutations/deleteContact.ts";

import getContact from "./queries/getContact.ts";
import getContacts from "./queries/getContacts.ts";

import { Contact } from "./entities/Contact.ts"

const resolvers = {
  Contact,
  Query: {
    getContact,
    getContacts
  },
  Mutation: {
    addContact,
    updateContact,
    deleteContact
  }
};

export default resolvers;
