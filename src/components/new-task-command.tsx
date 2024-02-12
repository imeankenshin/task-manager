import { Portal } from "solid-js/web";
import { Dialog } from "@ark-ui/solid";
import { HStack, styled } from "styled-system/jsx";
import { css } from "styled-system/css";
import { TodoInput, TodoInputSchema } from "~/types/todo";
import { vstack } from "styled-system/patterns";
import { safeParse } from "valibot";

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
              const formData = new FormData(e.currentTarget);
              const title = (formData.get("text") || "").toString().trim();
              const description = (formData.get("description") || "").toString().trim();
              const data = safeParse(TodoInputSchema, {
                title,
                description
              });
              e.preventDefault();
              if (data.success) {
                props.onAdd(data.output);
                e.currentTarget.reset();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) {
                document.getElementById("add-task")?.click();
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
              gap: "4",
              padding: "6"
            })}
          >
            <input
              name="text"
              id="text"
              ref={props.inputRef}
              required={true}
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
                w: "full"
              })}
            />
            <textarea
              name="description"
              id="description"
              placeholder="Add a description"
              rows={3}
              class={css({
                _focus: {
                  outline: "none"
                },
                _placeholder: {
                  color: "warmGray.500"
                },
                resize: "none",
                bgColor: "transparent",
                fontSize: "medium",
                fontWeight: "medium",
                w: "full"
              })}
            />
            <HStack w="full">
              <HStack w="full" gap="2" />
              <button
                id="add-task"
                type="submit"
                class={css({
                  _hover: {
                    bgColor: "warmGray.400"
                  },
                  bgColor: "warmGray.300",
                  borderRadius: "lg",
                  color: "warmGray.700",
                  fontWeight: "medium",
                  height: "10",
                  paddingX: "3",
                  whiteSpace: "nowrap"
                })}
              >
                Add Task
              </button>
            </HStack>
          </styled.form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
