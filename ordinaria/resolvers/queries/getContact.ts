import { GraphQLError } from "graphql";
import { ContactModel, ContactModelType } from "../../db/contact.ts";

const getContact = async (_: unknown, args: { id: string }): Promise<ContactModelType> => {
  const contact = await ContactModel.findById(args.id).exec();
  if (!contact) {
    throw new GraphQLError(`No contact found with id ${args.id}`, {
      extensions: { code: "NOT_FOUND" },
    });
  }
  return contact;
};

export default getContact;
