export type TodoStatus = "todo" | "done";

export type Todo = {
  createdAt: Date;
  deadline: Date;
  description?: string;
  id: string;
  status: TodoStatus;
  title: string;
};
