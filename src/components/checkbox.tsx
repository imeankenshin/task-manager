import { square } from "styled-system/patterns";
import { createSignal } from "solid-js";
import { styled } from "styled-system/jsx";

type CheckboxProps = {
  id?: string;
  defaultChecked?: boolean;
};
export default function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = createSignal(props.defaultChecked ?? false);
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
        id={props.id}
        role="checkbox"
        aria-checked={checked()}
        onClick={() => setChecked(!checked())}
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
            color: "warmGray.300",
            ["& > span"]: {
              display: "block"
            }
          }
        })}
      >
        <styled.span display="none" position="absolute">
          ✓
        </styled.span>
      </button>
    </styled.label>
  );
}
