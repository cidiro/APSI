import { numberIsValid } from "../services/numberIsValid.ts"

// Validate name
const nameIsValid = (name: string) => name.length >= 3 && name.length <= 50;

// Validate number
const phoneNumberIsValid = async (number: string): Promise<Boolean> => {
  if (/^(\+\d+)?\d+$/.test(number))
    return await numberIsValid(number);
  return false;
}

export const validators = {
  nameIsValid,
  phoneNumberIsValid
};
