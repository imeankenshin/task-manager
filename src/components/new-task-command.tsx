import { Portal } from "solid-js/web";
import { Dialog } from "@ark-ui/solid";
import { styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import { TodoInput } from "~/types/todo";

type NewTaskCommandProps = {
  onAdd: (todo: TodoInput) => void;
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
          position: "fixed",
          display: "flex",
          alignItems: "top",
          justifyContent: "center",
          pt: "32",
          top: "0",
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
              const title = (formData.get("text") || "").toString().trim();
              e.preventDefault();
              if (title && input) {
                props.onAdd({
                  description: null,
                  deadline: new Date(),
                  title
                });
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
                h: "16",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "warmGray.400",
                px: "6",
                rounded: "xl",
                w: "full",
                boxShadow: "2xl",
                _focus: {
                  outline: "none"
                },
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
