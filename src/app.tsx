// @refresh reload
import "./app.css";
import { VStack, styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import { createSignal, For } from "solid-js";
import TaskItem from "~/components/task-item";

type Todo = {
  text: string;
  completed: boolean;
};
export default function App() {
  // cannot start with a space
  const [todos, setTodos] = createSignal(new Array<Todo>());
  return (
    <VStack maxWidth="4xl" minH="screen" py="16" mx="auto" gap="8">
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
      <styled.ul
        display="flex"
        flexDirection="column"
        px="6"
        listStyleType="none"
        m="0"
        p="0"
        w="full"
        gap="6"
      >
        <For each={todos()}>
          {(todo, index) => (
            <styled.li w="full">
              <TaskItem
                onDeleted={() => {
                  const newTodos = [...todos()];
                  newTodos.splice(index(), 1);
                  setTodos(newTodos);
                }}
                id={index().toString()}
                completed={todo.completed}
                title={todo.text}
                description="test"
              />
            </styled.li>
          )}
        </For>
      </styled.ul>
    </VStack>
  );
}
