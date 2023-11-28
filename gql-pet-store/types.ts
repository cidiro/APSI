export type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  owner: string;
  medicalHistory: string[];
};

export type Owner = {
  id: string;
  name: string;
  phone: string;
  pets: Pet[];
};

export type MedicalRecord = {
  id: string;
  pet: string;
  date: string;
  description: string;
};
