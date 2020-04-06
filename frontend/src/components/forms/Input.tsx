import * as React from "react";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLInputElement> & {
  hasError?: boolean;
};

type Ref = HTMLInputElement;

const withoutCustom = ({ hasError, ...rest }: Props) => rest;

export const Input = React.forwardRef<Ref, Props>((props: Props, ref) => {
  const classes = classNames(
    ["appearance-none block w-full px-3 py-2"],
    {
      "border border-indigo-300": !props.hasError,
      "border border-red-500": props.hasError
    },
    [
      "placeholder-gray-500 text-gray-900 rounded-md shadow-sm",
      "focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10",
      "sm:text-sm sm:leading-5"
    ]
  );

  return <input {...withoutCustom(props)} ref={ref} className={classes} />;
});

Input.displayName = "Input";
