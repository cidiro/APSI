export type Mortgage = {
  id: string;
  amount: number;
  terms: number;
  terms_remaining: number;
  client: Omit<Client, "mortgages" | "manager">;
  manager: Omit<Manager, "clients">;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: number;
  balance: number;
  mortgages: Array<Omit<Mortgage, "client" | "manager">>;
  manager: Omit<Manager, "clients">;
};

export type Manager = {
  id: number;
  name: string;
  email: string;
  phone: string;
  clients: Array<Omit<Client, "mortgages" | "manager">>;
};
