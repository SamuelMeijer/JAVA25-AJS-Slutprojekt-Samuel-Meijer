export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  person: string | null;
  timestamp: string;
};

export type newTask = {
  title: string;
  description: string;
  category: string;
};

export type updateTask = {
  id: string;
  status: string;
  person: string;
};
