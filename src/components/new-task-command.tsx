import { Portal } from "solid-js/web";
import { Dialog } from "@ark-ui/solid";
import { styled } from "styled-system/jsx";
import { css } from "styled-system/css";

type NewTaskCommandProps = {
  onAdd: (text: string) => void;
  inputRef: (el: HTMLInputElement) => void;
};
export function NewTaskCommand(props: NewTaskCommandProps) {
  return (
    <Portal>
      <Dialog.Backdrop
        class={css({
          w: "screen",
          h: "screen",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          bgColor: "rgba(0, 0, 0, 0.2)",
          backdropBlur: "md",
          zIndex: "10"
        })}
      />
      <Dialog.Positioner
        class={css({
          w: "screen",
          h: "screen",
          position: "fixed",
          display: "flex",
          alignItems: "top",
          justifyContent: "center",
          pt: "32",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: "10"
        })}
      >
        <Dialog.Content
          class={css({
            w: "full",
            maxW: "3xl",
            px: "6"
          })}
        >
          <styled.form
            display="flex"
            w="full"
            justifyContent="center"
            onSubmit={(e) => {
              const input = e.currentTarget.querySelector("input");
              const formData = new FormData(e.currentTarget);
              const text = (formData.get("text") || "").toString().trim();
              e.preventDefault();
              if (text && input) {
                props.onAdd(text);
              }
              e.currentTarget.reset();
            }}
          >
            <input
              name="text"
              id="text"
              ref={props.inputRef}
              autocomplete="off"
              placeholder="What do you need to do?"
              class={css({
                bgColor: "warmGray.200",
                flex: 8,
                fontSize: "xl",
                fontWeight: "medium",
                h: "14",
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
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
