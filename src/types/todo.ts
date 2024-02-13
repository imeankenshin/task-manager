import {
  date,
  enum_,
  Input,
  maxLength,
  minLength,
  object,
  optional,
  type Output,
  string
} from "valibot";

export const TodoStatus = {
  DOING: "doing",
  DONE: "done",
  REVIEWING: "reviewing",
  TODO: "todo"
} as const;
export const TodoStatusSchema = enum_(TodoStatus);
export const TodoInputSchema = object({
  deadline: optional(date()),
  description: optional(string([maxLength(2 ** 12 - 1)])),
  status: optional(TodoStatusSchema, TodoStatus.TODO),
  title: string([minLength(1), maxLength(2 ** 8 - 1)])
});
export type TodoStatusValue = Output<typeof TodoStatusSchema>;
export type TodoInput = Input<typeof TodoInputSchema>;
export type Todo = TodoInput & {
  createdAt: Date;
  id: string;
};
