export type Client = {
  id: string;
  name: string;
  email: string;
  cards?: Array<string>;
  travels?: Array<Omit<Travel, "client" | "driver">>;
};

export type Driver = {
  id: string;
  name: string;
  email: string;
  username: string;
  travels?: Array<Omit<Travel, "client" | "driver">>;
};

export type Travel = {
  id: string;
  money: number;
  distance: number;
  date: Date;
  status?: string;
  client?: Omit<Client, "travels">;
  driver?: Omit<Driver, "travels">;
};

export enum Status {
  ONGOING,
  COMPLETED,
}
