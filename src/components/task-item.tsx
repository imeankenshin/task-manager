import { Flex } from "styled-system/jsx";
import Checkbox from "~/components/checkbox";
import { css } from "styled-system/css";

type TaskItemProps = {
  title: string;
  completed: boolean;
};

export default function TaskItem(props: TaskItemProps) {
  return (
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
      <Checkbox defaultChecked={props.completed} />
      <span
        class={css({
          color: "warmGray.700",
          fontSize: "xl",
          fontWeight: "medium",
          textDecoration: props.completed ? "line-through" : "none"
        })}
      >
        {props.title}
      </span>
    </Flex>
  );
}
