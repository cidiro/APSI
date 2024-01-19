import { GraphQLError } from "graphql";
import { ContactModel, ContactModelType } from "../../db/contact.ts";

const updateContact = async (
  _: unknown,
  args: { id: string, fullName: string, number: string }
): Promise<ContactModelType> => {
  const contact = await ContactModel.findByIdAndUpdate(
    args.id,
    { name: args.fullName, number: args.number },
    { new: true, runValidators: true }
  ).exec();

  if (!contact) {
    throw new GraphQLError(`No contact found with id ${args.id}`, {
      extensions: { code: "NOT_FOUND" },
    });
  }
  return contact;
};

export default updateContact;
