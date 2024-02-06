import { css } from "styled-system/css";
import { DialogTrigger } from "@ark-ui/solid";
import { vstack } from "styled-system/patterns";

export function NoTasks() {
  return (
    <div class={vstack({ textAlign: "center", w: "full", gap: "4" })}>
      <h2 class={css({ fontSize: "3xl", fontWeight: "medium" })}>No tasks</h2>
      <p class={css({ fontSize: "lg", color: "warmGray.500" })}>
        Create a new task to get started.
      </p>
      <DialogTrigger>New Task</DialogTrigger>
    </div>
  );
}
