import { Flex, HStack } from "styled-system/jsx";
import Checkbox from "~/components/checkbox";
import { css } from "styled-system/css";
import { Show } from "solid-js";

type TaskItemProps = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onDeleted?: () => void;
};

export default function TaskItem(props: TaskItemProps) {
  const titleId = () => `task-title-${props.id}`;
  const checkboxId = () => `task-checkbox-${props.id}`;
  return (
    <Flex
      onKeyDown={(e) => {
        if (e.key === "Backspace" && props.onDeleted) {
          props.onDeleted();
        }
      }}
      class="group"
      role="group"
      w="full"
      gap="3"
      borderBottomWidth="1"
      borderBottomColor="warmGray.200"
      aria-labelledby={titleId()}
    >
      <Checkbox id={checkboxId()} defaultChecked={props.completed} />
      <Flex direction="column" gap="1" w="full">
        <HStack>
          <span
            id={titleId()}
            class={css({
              width: "full",
              color: "warmGray.700",
              fontSize: "xl",
              fontWeight: "bold",
              textDecoration: props.completed ? "line-through" : "none"
            })}
          >
            {props.title}
          </span>
          <div
            class={css({
              display: "none",
              _groupFocusWithin: {
                display: "block"
              },
              _groupHover: {
                display: "block"
              }
            })}
          >
            <button
              tabIndex={-1}
              class={css({
                color: "warmGray.500",
                fontSize: "lg",
                textDecoration: "none",
                _hover: {
                  textDecoration: "underline"
                }
              })}
            >
              Edit
            </button>
          </div>
        </HStack>
        <Show when={props.description}>
          <div
            class={css({
              color: "warmGray.700",
              fontSize: "lg",
              textDecoration: props.completed ? "line-through" : "none"
            })}
          >
            {props.description}
          </div>
        </Show>
      </Flex>
    </Flex>
  );
}
