import { ContactModel } from "../../db/contact.ts";

const deleteContact = async (_: unknown, args: { id: string }): Promise<Boolean> => {
  const contact = await ContactModel.findByIdAndDelete(args.id).exec();
  return !!contact;
};

export default deleteContact;
