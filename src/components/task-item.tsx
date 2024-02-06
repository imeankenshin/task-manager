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
  onChange?: (checked: boolean) => void;
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
      <Checkbox
        tabindex={-1}
        id={checkboxId()}
        defaultChecked={props.completed}
        onCheckedChange={(checked) => {
          if (props.onChange) {
            props.onChange(checked);
          }
        }}
      />
      <Flex direction="column" gap="1" w="full">
        <HStack>
          <span
            id={titleId()}
            class={css({
              width: "full",
              color: "warmGray.700",
              fontSize: "xl",
              fontWeight: "bold",
              _groupHasChecked: {
                textDecoration: "line-through"
              }
            })}
          >
            {props.title}
          </span>
        </HStack>
        <Show when={props.description}>
          <div
            data-completed={props.completed}
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
