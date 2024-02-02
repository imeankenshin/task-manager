import { JSX, mergeProps, splitProps, createSignal } from "solid-js";

type AdditionalFocusableGroupProps = {
  direction?: "vertical" | "horizontal";
  onPrevious?: JSX.EventHandler<HTMLUListElement, KeyboardEvent>;
  onNext?: JSX.EventHandler<HTMLUListElement, KeyboardEvent>;
  focusTarget?: string;
};
type FocusableGroupProps = Omit<
  JSX.HTMLAttributes<HTMLUListElement>,
  keyof AdditionalFocusableGroupProps
> &
  AdditionalFocusableGroupProps;

export function FocusableGroup(props: FocusableGroupProps) {
  const merged = mergeProps(
    { direction: "vertical", focusTarget: "" } as FocusableGroupProps,
    props
  );
  const [additional, rest] = splitProps(merged, [
    "direction",
    "onPrevious",
    "onNext",
    "focusTarget"
  ] as (keyof AdditionalFocusableGroupProps)[]);
  const [lastFocusedTask, setLastFocusedTask] = createSignal<HTMLElement>();
  let groupEl: HTMLElement;
  const focusHandler = (next: boolean) => {
    const currentEl = lastFocusedTask();
    if (currentEl && groupEl.contains(currentEl)) {
      const nextEl = next ? currentEl.previousElementSibling : currentEl.nextElementSibling;
      if (nextEl instanceof HTMLElement && typeof nextEl.dataset.focusTarget) {
        nextEl.querySelector<HTMLElement>(nextEl.dataset.focusTarget as string)?.focus();
        setLastFocusedTask(nextEl);
        return;
      }
    }
    const nextEl = next ? groupEl.lastElementChild : groupEl.firstElementChild;
    if (nextEl instanceof HTMLElement && nextEl.dataset.focusTarget) {
      nextEl.querySelector<HTMLElement>(nextEl.dataset.focusTarget)?.focus();
      setLastFocusedTask(nextEl);
    }
  };

  return (
    <ul
      {...rest}
      onKeyDown={(e) => {
        const isHorizontal = additional.direction === "horizontal";
        const isVertical = additional.direction === "vertical";
        const isUpOrRight = ["ArrowUp", "ArrowLeft", "k"].includes(e.key);
        const isDownOrLeft = ["ArrowDown", "ArrowRight", "j"].includes(e.key);
        if ((isHorizontal && isUpOrRight) || (isVertical && isDownOrLeft)) {
          if (additional.onNext) additional.onNext(e);
          if (!e.defaultPrevented) focusHandler(false);
        } else if ((isHorizontal && isDownOrLeft) || (isVertical && isUpOrRight)) {
          if (additional.onPrevious) additional.onPrevious(e);
          if (!e.defaultPrevented) focusHandler(true);
        }
      }}
      ref={(el) => (groupEl = el)}
      tabindex={0}
    />
  );
}

type AdditionalFocusableItemProps =
  | {
      focusTarget: keyof HTMLElementTagNameMap;
    }
  | {
      focusTarget: string;
    };

type FocusableItemProps = Omit<
  JSX.HTMLAttributes<HTMLLIElement>,
  keyof AdditionalFocusableItemProps
> &
  AdditionalFocusableItemProps;

export function FocusableItem(props: FocusableItemProps) {
  const [additional, rest] = splitProps(props, [
    "focusTarget"
  ] as (keyof AdditionalFocusableItemProps)[]);
  return <li {...rest} data-focus-target={additional.focusTarget} />;
}
