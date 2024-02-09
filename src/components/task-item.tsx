import { Flex, HStack } from "styled-system/jsx";
import StatusBox from "~/components/status-box";
import { css } from "styled-system/css";
import { JSX, Show } from "solid-js";
import { Todo, TodoStatusValue } from "~/types/todo";

type TaskItemProps = Todo & {
  onDelete?: JSX.EventHandler<HTMLDivElement, Event>;
  onStatusChange?: (status: TodoStatusValue) => void;
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
      id={props.id}
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
      <StatusBox
        tabindex={-1}
        id={checkboxId()}
        defaultStatus={props.status}
        onStatusChange={(status) => {
          if (props.onStatusChange) {
            props.onStatusChange(status);
          }
        }}
      />
      <Flex direction="column" gap="1" w="full">
        <HStack>
          <span
            id={titleId()}
            class={css({
              width: "full",
              fontSize: "xl",
              fontWeight: "medium",
              _groupHasDone: {
                textDecoration: "line-through"
              }
            })}
          >
            {props.title}
          </span>
        </HStack>
        <Show when={props.description}>
          <div
            data-completed={props.status}
            id={descriptionId()}
            class={css({
              color: "warmGray.700",
              fontSize: "lg"
            })}
          >
            {props.description}
          </div>
        </Show>
      </Flex>
    </Flex>
  );
}
