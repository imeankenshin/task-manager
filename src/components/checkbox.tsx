import { square } from "styled-system/patterns";
import { createEffect, createSignal, JSX, on, Setter } from "solid-js";
import { styled } from "styled-system/jsx";
import { css } from "styled-system/css";

type AdditionalCheckboxProps = {
  checked?: boolean;
  setChecked?: Setter<boolean>;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

type CheckboxProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof AdditionalCheckboxProps
> &
  AdditionalCheckboxProps;
export default function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = createSignal(props.defaultChecked || false);
  createEffect(
    on(checked, (value) => {
      console.log("checked", value);
      if (props.onCheckedChange) {
        props.onCheckedChange(value);
      }
    })
  );
  return (
    <styled.label
      for={props.id}
      class={square({
        display: "inline-grid",
        placeItems: "center",
        position: "relative",
        size: "8",
        verticalAlign: "middle"
      })}
    >
      <button
        {...props}
        id={props.id}
        role="checkbox"
        type="button"
        onClick={() => {
          setChecked(!checked());
        }}
        aria-checked={checked()}
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
          _ariaChecked: {
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
            ["button[aria-checked=true] > &"]: {
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
