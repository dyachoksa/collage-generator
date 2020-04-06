import * as React from "react";
import classNames from "classnames";

type Props = React.PropsWithChildren<
  React.HTMLProps<HTMLButtonElement> & {
    type?: "button" | "submit" | "reset";
    color?: "primary" | "white" | "red";
    btnSize?: "sm" | "base";
    wide?: boolean;
  }
>;

const removeProperty = prop => ({ [prop]: _, ...rest }) => rest;

const removeWide = removeProperty("wide");
const removeColor = removeProperty("color");
const removeSize = removeProperty("btnSize");

export const Button: React.FC<Props> = (props: Props) => {
  const btnType = props.type || "button";
  const btnColor = props.color || "primary";
  const btnSize = props.btnSize || "base";

  const classes = classNames(
    [
      "inline-flex items-center justify-center",
      "border leading-5 font-medium rounded-md focus:outline-none",
      "disabled:opacity-65 transition duration-150 ease-in-out"
    ],
    {
      "px-3 py-2 text-xs": btnSize == "sm",
      "px-4 py-2 text-sm": btnSize == "base",
      "border-transparent text-white bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700":
        btnColor == "primary",
      "border-transparent text-white bg-red-600 hover:bg-red-500 focus:shadow-outline-red focus:border-red-700 active:bg-red-700":
        btnColor == "red",
      "border-gray-300 text-gray-700 bg-white hover:text-gray-500 focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800":
        btnColor == "white",
      "w-40": props.wide
    }
  );

  const btnProps = removeSize(removeColor(removeWide(props)));
  btnProps.type = btnType;

  return (
    <button {...btnProps} className={classes}>
      {props.children}
    </button>
  );
};
