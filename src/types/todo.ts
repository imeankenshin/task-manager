export const TodoStatus = {
  TODO: "todo",
  DOING: "doing",
  REVIEWING: "reviewing",
  DONE: "done"
} as const;
export type TodoStatusValue = (typeof TodoStatus)[keyof typeof TodoStatus];

export type Todo = {
  createdAt: Date;
  deadline: Date;
  description?: string;
  id: string;
  status: TodoStatusValue;
  title: string;
};
