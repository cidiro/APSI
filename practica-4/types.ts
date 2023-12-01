export type Business = {
  id: string;
  name: string;
  workers: Array<Omit<Worker, "business" | "tasks">>;
  tasks: Array<Omit<Task, "worker" | "business">>;
};

export type Task = {
  id: string;
  name: string;
  state: State;
  worker: Omit<Worker, "business" | "tasks"> | null;
  business: Omit<Business, "workers" | "tasks"> | null;
};

export type Worker = {
  id: string;
  name: string;
  business: Omit<Business, "workers" | "tasks"> | null;
  tasks: Array<Omit<Task, "worker" | "business">>;
};

export enum State {
  TODO = "TO DO",
  INPROGRESS = "IN PROGRESS",
  TESTING = "TESTING",
  CLOSED = "CLOSED",
}
