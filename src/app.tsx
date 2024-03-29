// @refresh reload
import "./app.css";
import { VStack } from "styled-system/jsx";
import { css } from "styled-system/css";
import { createSignal, For, Show } from "solid-js";
import TaskItem from "~/components/task-item";
import { FocusableGroup, FocusableItem } from "~/components/focusable";
import { vstack } from "styled-system/patterns";
import { NewTaskCommand } from "~/components/new-task-command";
import { Dialog } from "@ark-ui/solid";
import { NoTasks } from "~/components/no-tasks";
import { Todo, TodoStatus } from "~/types/todo";

export default function App() {
  const [todos, setTodos] = createSignal(new Array<Todo>());
  const [commandIsOpen, setCommandIsOpen] = createSignal(false);
  const focusTarget = "button";
  let taskListRef: HTMLElement;
  let inputRef: HTMLInputElement;
  return (
    <Dialog.Root
      finalFocusEl={() =>
        document.contains(taskListRef) && taskListRef.firstElementChild
          ? taskListRef.firstElementChild.querySelector(focusTarget)
          : null
      }
      open={commandIsOpen()}
      onOpenChange={(e) => {
        setCommandIsOpen(e.open);
      }}
    >
      <VStack
        maxWidth="3xl"
        minH="screen"
        px="6"
        py="16"
        mx="auto"
        gap="8"
        onKeyDown={(e) => {
          switch (e.key) {
            case "c": {
              if (document.activeElement !== inputRef) {
                e.preventDefault();
                setCommandIsOpen(true);
              }
              break;
            }
          }
        }}
      >
        <NewTaskCommand
          onAdd={(todo) => {
            setTodos([
              ...todos(),
              {
                ...todo,
                id: Math.random().toString(36).substring(7),
                status: TodoStatus.TODO,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            ]);
            setCommandIsOpen(false);
          }}
          inputRef={(el) => (inputRef = el)}
        />
        <h1 class={css({ fontSize: "5xl", fontWeight: "medium", w: "full" })}>Tasks</h1>
        <Show when={todos().length !== 0} fallback={<NoTasks />}>
          <FocusableGroup
            id="task-list"
            ref={(el) => (taskListRef = el)}
            class={vstack({
              borderRadius: "lg",
              listStyleType: "none",
              m: "0",
              p: "0",
              w: "full",
              gap: "6",
              outlineWidth: "4",
              outlineOffset: "1",
              outlineColor: "warmGray.700"
            })}
          >
            <For each={todos()}>
              {(todo, index) => (
                <FocusableItem
                  focusTarget={focusTarget}
                  class={css({
                    w: "full"
                  })}
                >
                  <TaskItem
                    onStatusChange={(checked) => {
                      const newTodos = [...todos()];
                      newTodos[index()].status = checked ? "done" : "todo";
                      setTodos(newTodos);
                    }}
                    onDelete={(e) => {
                      const currentEl = e.currentTarget.parentElement;
                      const prevEl = currentEl?.previousElementSibling;
                      const nextEl = currentEl?.nextElementSibling;
                      const newTodos = [...todos()];
                      newTodos.splice(index(), 1);
                      setTodos(newTodos);
                      if (nextEl) {
                        nextEl.querySelector("button")?.focus();
                      } else if (prevEl) {
                        prevEl.querySelector("button")?.focus();
                      } else {
                        inputRef?.focus();
                      }
                    }}
                    {...todo}
                  />
                </FocusableItem>
              )}
            </For>
          </FocusableGroup>
        </Show>
      </VStack>
    </Dialog.Root>
  );
}
