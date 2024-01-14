// @refresh reload
import "./app.css";
import { Flex, VStack, styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import Checkbox from "~/components/checkbox";
import { createSignal, For } from "solid-js";

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
      <ul
        class={css({
          listStyleType: "none",
          m: "0",
          p: "0",
          w: "full"
        })}
      >
        <For each={todos()}>
          {(todo) => (
            <li>
              <Flex
                px="8"
                h="12"
                w="full"
                gap="3"
                justifyContent="flex-start"
                alignItems="center"
                borderBottomWidth="1"
                borderBottomColor="warmGray.200"
              >
                <Checkbox defaultChecked={todo.completed} />
                <span
                  class={css({
                    color: "warmGray.700",
                    fontSize: "xl",
                    fontWeight: "medium",
                    textDecoration: todo.completed ? "line-through" : "none"
                  })}
                >
                  {todo.text}
                </span>
              </Flex>
            </li>
          )}
        </For>
      </ul>
    </VStack>
  );
}
