// @refresh reload
import "./app.css";
import { VStack, styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import { createSignal, For } from "solid-js";
import TaskItem from "~/components/task-item";
import { FocusableGroup, FocusableItem } from "~/components/focusable";
import { vstack } from "styled-system/patterns";

type Todo = {
  text: string;
  completed: boolean;
};
export default function App() {
  const [todos, setTodos] = createSignal(new Array<Todo>());
  const [lastFocusedTask, setLastFocusedTask] = createSignal<HTMLElement>();
  let taskListRef: HTMLElement;
  let inputRef: HTMLInputElement;
  return (
    <VStack
      maxWidth="4xl"
      minH="screen"
      py="16"
      mx="auto"
      gap="8"
      onKeyDown={(e) => {
        const currentEl = lastFocusedTask();
        switch (e.key) {
          case "Escape": {
            if (currentEl && document.body.contains(currentEl)) {
              currentEl.querySelector("button")?.focus();
              break;
            }
            if (taskListRef.firstElementChild) {
              taskListRef.firstElementChild.querySelector("button")?.focus();
              setLastFocusedTask(taskListRef.firstElementChild as HTMLElement);
              break;
            }
            e.currentTarget.querySelector("input")?.blur();
            break;
          }
          case "/": {
            e.preventDefault();
            inputRef?.focus();
            break;
          }
        }
      }}
    >
      <styled.form
        display="flex"
        w="full"
        px="8"
        justifyContent="center"
        onSubmit={(e) => {
          const input = e.currentTarget.querySelector("input");
          const formData = new FormData(e.currentTarget);
          const text = (formData.get("text") || "").toString().trim();
          e.preventDefault();
          if (!text || !input) return;
          setTodos([...todos(), { text, completed: false }]);
          input.value = "";
        }}
      >
        <input
          name="text"
          id="text"
          ref={(el) => {
            inputRef = el;
          }}
          autocomplete="off"
          placeholder="What do you need to do?"
          class={css({
            bgColor: "warmGray.200",
            flex: 8,
            fontSize: "xl",
            fontWeight: "medium",
            h: "14",
            maxWidth: 674,
            outlineOffset: "1",
            outlineWidth: "4",
            outlineColor: "warmGray.700",
            px: "5",
            rounded: "xl",
            w: "full",
            _placeholder: {
              color: "warmGray.500"
            }
          })}
        />
      </styled.form>
      <FocusableGroup
        id="task-list"
        tabindex="0"
        ref={(el) => (taskListRef = el)}
        class={vstack({
          borderRadius: "lg",
          px: "6",
          listStyleType: "none",
          m: "0",
          p: "0",
          w: "full",
          gap: "6",
          outlineWidth: "4",
          outlineOffset: "1",
          outlineColor: "warmGray.700",
          _ariaChecked: {
            bgColor: "warmGray.800",
            color: "warmGray.300"
          }
        })}
      >
        <For each={todos()}>
          {(todo, index) => (
            <FocusableItem
              focusTarget="button"
              class={css({
                w: "full"
              })}
            >
              <TaskItem
                onChange={(checked) => {
                  const newTodos = [...todos()];
                  newTodos[index()].completed = checked;
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
                id={index().toString()}
                completed={todo.completed}
                title={todo.text}
                description="test"
              />
            </FocusableItem>
          )}
        </For>
      </FocusableGroup>
    </VStack>
  );
}
