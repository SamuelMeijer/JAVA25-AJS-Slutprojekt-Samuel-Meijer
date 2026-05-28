export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  person: undefined | string;
  timestamp: string;
};

export type updateTask = {
  id: number;
  status?: string;
  person?: string;
};

export type newTask = {
  title: string;
  description: string;
  category: string;
};
