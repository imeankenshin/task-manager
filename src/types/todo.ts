import { date, enum_, maxLength, minLength, nullable, object, type Output, string } from "valibot";

export const TodoStatus = {
  DOING: "doing",
  DONE: "done",
  REVIEWING: "reviewing",
  TODO: "todo"
} as const;
export const todoStatusSchema = enum_(TodoStatus);
export const todoInputSchema = object({
  deadline: nullable(date()),
  description: nullable(string([maxLength(4095)])),
  status: todoStatusSchema,
  title: string([minLength(1), maxLength(255)])
});
export type TodoStatusValue = Output<typeof todoStatusSchema>;
export type TodoInput = Output<typeof todoInputSchema>;
export type Todo = TodoInput & {
  createdAt: Date;
  id: string;
};
