export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  person: undefined | string;
  timestamp: string;
};
