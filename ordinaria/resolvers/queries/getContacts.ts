import { ContactModel, ContactModelType } from "../../db/contact.ts";

const getContacts = async (): Promise<ContactModelType[]> => {
  return await ContactModel.find().exec();
};

export default getContacts;
