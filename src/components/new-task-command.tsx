import { Portal } from "solid-js/web";
import { Dialog } from "@ark-ui/solid";
import { styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import { TodoInput } from "~/types/todo";
import { vstack } from "styled-system/patterns";

type NewTaskCommandProps = {
  onAdd: (todo: TodoInput) => void;
  inputRef: (el: HTMLInputElement) => void;
};

export function NewTaskCommand(props: NewTaskCommandProps) {
  return (
    <Portal>
      <Dialog.Backdrop
        class={css({
          backdropBlur: "md",
          bgColor: "rgba(0, 0, 0, 0.2)",
          bottom: "0",
          h: "screen",
          left: "0",
          position: "fixed",
          right: "0",
          top: "0",
          w: "screen",
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
              const description = (formData.get("description") || "").toString().trim();
              e.preventDefault();
              if (title && input) {
                props.onAdd({
                  description: description || null,
                  deadline: new Date(),
                  title
                });
              }
              e.currentTarget.reset();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) {
                e.currentTarget.dispatchEvent(new Event("submit"));
              }
            }}
            class={vstack({
              alignItems: "center",
              bgColor: "warmGray.50",
              borderColor: "warmGray.400",
              borderRadius: "2xl",
              borderStyle: "solid",
              borderWidth: "1px",
              boxShadow: "2xl",
              gap: "2",
              pb: "6"
            })}
          >
            <input
              name="text"
              id="text"
              ref={props.inputRef}
              autocomplete="off"
              placeholder="What do you need to do?"
              class={css({
                _focus: {
                  outline: "none"
                },
                _placeholder: {
                  color: "warmGray.500"
                },
                bgColor: "transparent",
                fontSize: "xl",
                fontWeight: "medium",
                h: "16",
                px: "6",
                roundedTop: "xl",
                w: "full"
              })}
            />
            <textarea
              name="description"
              id="description"
              placeholder="Add a description"
              rows={4}
              class={css({
                _focus: {
                  outline: "none"
                },
                _placeholder: {
                  color: "warmGray.500"
                },
                resize: "none",
                bgColor: "transparent",
                flex: 8,
                fontSize: "medium",
                fontWeight: "medium",
                px: "6",
                roundedBottom: "xl",
                w: "full"
              })}
            />
          </styled.form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
