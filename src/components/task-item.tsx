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
      w="full"
      gap="3"
      borderBottomWidth="1"
      borderBottomColor="warmGray.200"
      aria-labelledby=""
    >
      <Checkbox defaultChecked={props.completed} />
      <Flex direction="column" gap="1" w="full">
        <div
          class={css({
            color: "warmGray.700",
            fontSize: "xl",
            fontWeight: "bold",
            textDecoration: props.completed ? "line-through" : "none"
          })}
        >
          {props.title}
        </div>
      </Flex>
    </Flex>
  );
}
