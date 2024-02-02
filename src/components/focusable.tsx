import { JSX, mergeProps, splitProps } from "solid-js";

type AdditionalFocusableGroupProps = {
  direction?: "vertical" | "horizontal";
  onPrevious?: JSX.EventHandler<HTMLUListElement, KeyboardEvent>;
  onNext?: JSX.EventHandler<HTMLUListElement, KeyboardEvent>;
};
type FocusableGroupProps = Omit<
  JSX.HTMLAttributes<HTMLUListElement>,
  keyof AdditionalFocusableGroupProps
> &
  AdditionalFocusableGroupProps;

export function FocusableGroup(props: FocusableGroupProps) {
  const merged = mergeProps({ direction: "vertical" } as FocusableGroupProps, props);
  const [additional, rest] = splitProps(merged, [
    "direction",
    "onPrevious",
    "onNext"
  ] as (keyof AdditionalFocusableGroupProps)[]);

  return (
    <ul
      {...rest}
      onKeyDown={(e) => {
        const isHorizontal = additional.direction === "horizontal";
        const isVertical = additional.direction === "vertical";
        const isUpOrRight = ["ArrowUp", "ArrowRight", "k"].includes(e.key);
        const isDownOrLeft = ["ArrowDown", "ArrowLeft", "j"].includes(e.key);

        if (((isHorizontal && isUpOrRight) || (isVertical && isDownOrLeft)) && additional.onNext) {
          additional.onNext(e);
        } else if (
          ((isHorizontal && isDownOrLeft) || (isVertical && isUpOrRight)) &&
          additional.onPrevious
        ) {
          additional.onPrevious?.(e);
        }
      }}
      tabindex={0}
    />
  );
}
