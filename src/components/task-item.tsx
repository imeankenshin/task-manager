import { Flex, HStack } from "styled-system/jsx";
import Checkbox from "~/components/checkbox";
import { css } from "styled-system/css";
import { JSX, Show } from "solid-js";

type TaskItemProps = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onDelete?: JSX.EventHandler<HTMLDivElement, Event>;
};

export default function TaskItem(props: TaskItemProps) {
  const titleId = () => `task-title-${props.id}`,
    descriptionId = () => `task-description-${props.id}`,
    checkboxId = () => `task-checkbox-${props.id}`,
    handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (e) => {
      switch (e.key) {
        case "Backspace":
          e.preventDefault();
          if (props.onDelete) {
            props.onDelete(e);
          }
          break;
      }
    };

  return (
    <Flex
      onKeyDown={handleKeyDown}
      class="group"
      role="group"
      w="full"
      gap="3"
      borderBottomWidth="1"
      borderBottomColor="warmGray.200"
      aria-labelledby={titleId()}
      aria-describedby={descriptionId()}
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
            id={descriptionId()}
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
