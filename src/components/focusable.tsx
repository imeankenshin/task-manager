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
  const [lastFocusedIndex, setLastFocusedIndex] = createSignal(0);
  let groupEl: HTMLElement;
  const getNextElement = (parent: Element) => {
    const next = parent.nextElementSibling;
    if (next instanceof HTMLElement) {
      return next;
    }
    return parent.parentElement?.firstElementChild as HTMLElement;
  };
  const getPreviousElement = (parent: Element) => {
    const previous = parent.previousElementSibling;
    if (previous instanceof HTMLElement) {
      return previous;
    }
    return parent.parentElement?.lastElementChild as HTMLElement;
  };
  const focusHandler = (next: boolean) => {
    const currentEl = groupEl.children[lastFocusedIndex()];
    const nextEl = next ? getNextElement(currentEl) : getPreviousElement(currentEl);
    if (nextEl instanceof HTMLElement) {
      nextEl.querySelector<HTMLElement>(nextEl.dataset.focusTarget as string)?.focus();
      setLastFocusedIndex(Array.from(groupEl.children).indexOf(nextEl));
    }
  };

  return (
    <ul
      {...rest}
      tabindex={0}
      data-last-focused-index={lastFocusedIndex()}
      onFocusOut={() => {
        setLastFocusedIndex(0);
      }}
      onKeyDown={(e) => {
        const isHorizontal = additional.direction === "horizontal";
        const isVertical = additional.direction === "vertical";
        const isUpOrRight = ["ArrowUp", "ArrowLeft", "k"].includes(e.key);
        const isDownOrLeft = ["ArrowDown", "ArrowRight", "j"].includes(e.key);
        if ((isHorizontal && isUpOrRight) || (isVertical && isDownOrLeft)) {
          if (additional.onPrevious) additional.onPrevious(e);
          if (!e.defaultPrevented) focusHandler(true);
        } else if ((isHorizontal && isDownOrLeft) || (isVertical && isUpOrRight)) {
          if (additional.onNext) additional.onNext(e);
          if (!e.defaultPrevented) focusHandler(false);
        }
      }}
      ref={(el) => (groupEl = el)}
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
