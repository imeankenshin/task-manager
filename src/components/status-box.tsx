import { square } from "styled-system/patterns";
import { createEffect, createSignal, JSX, on, Setter, splitProps } from "solid-js";
import { styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import { TodoStatusValue, TodoStatus } from "~/types/todo";

type AdditionalStatusBoxProps = {
  defaultStatus?: TodoStatusValue;
  onStatusChange?: (status: TodoStatusValue) => void;
  setChecked?: Setter<boolean>;
  status?: TodoStatusValue;
};

type StatusBoxProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof AdditionalStatusBoxProps
> &
  AdditionalStatusBoxProps;
export default function StatusBox(props: StatusBoxProps) {
  const [additional, rest] = splitProps(props, [
    "status",
    "setChecked",
    "defaultStatus",
    "onStatusChange"
  ] as (keyof AdditionalStatusBoxProps)[]);
  const [checked, setChecked] = createSignal(additional.defaultStatus || TodoStatus.TODO);
  createEffect(
    on(checked, (value) => {
      if (additional.onStatusChange) {
        additional.onStatusChange(value);
      }
    })
  );
  return (
    <styled.label
      for={rest.id}
      class={square({
        display: "inline-grid",
        placeItems: "center",
        position: "relative",
        size: "8",
        verticalAlign: "middle"
      })}
    >
      <button
        {...rest}
        type="button"
        onClick={() => {
          setChecked((prev) => (prev === TodoStatus.TODO ? TodoStatus.DONE : TodoStatus.TODO));
        }}
        data-status={checked()}
        class={square({
          border: "none",
          borderRadius: "lg",
          bgColor: "warmGray.200",
          color: "warmGray.500",
          display: "flex",
          fontSize: "lg",
          fontWeight: "medium",
          outlineWidth: "4",
          outlineOffset: "1",
          outlineColor: "warmGray.700",
          size: "6",
          _statusDone: {
            bgColor: "warmGray.800",
            color: "warmGray.300"
          }
        })}
      >
        <span
          class={css({
            visibility: "hidden",
            color: "warmGray.300",
            position: "absolute",
            userSelect: "none",
            ["button[data-status=done] > &"]: {
              visibility: "visible"
            }
          })}
        >
          ✓
        </span>
      </button>
    </styled.label>
  );
}
