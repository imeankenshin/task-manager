import {
  date,
  enum_,
  Input,
  maxLength,
  minLength,
  nullable,
  object,
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
  deadline: nullable(date()),
  description: nullable(string([maxLength(4095)])),
  status: TodoStatusSchema,
  title: string([minLength(1), maxLength(255)])
});
export type TodoStatusValue = Output<typeof TodoStatusSchema>;
export type TodoInput = Input<typeof TodoInputSchema>;
export type Todo = TodoInput & {
  createdAt: Date;
  id: string;
};
