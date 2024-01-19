import { ContactModelType } from "../../db/contact.ts";
import { getCountry } from "../../services/getCountry.ts"
import { getCapital } from "../../services/getCapital.ts"
import { getTime } from "../../services/getTime.ts"


export const Contact = {
	country: async (parent: ContactModelType): Promise<string> => {
		return await getCountry(parent.number);
	},
	time: async (parent: ContactModelType): Promise<string> => {
		const country = await getCountry(parent.number);
		const capital = await getCapital(country);
		return await getTime(capital);
	}
};
