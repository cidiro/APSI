import { ContactModel, ContactModelType } from "../../db/contact.ts";

const addContact = async (
  _: unknown,
  args: { fullName: string, number: string }
): Promise<ContactModelType> => {
  const contact = new ContactModel({
    fullName: args.fullName,
    number: args.number
  });

  await contact.save();
  return contact;
};

export default addContact;
