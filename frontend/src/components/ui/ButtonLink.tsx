import * as React from "react";
import classNames from "classnames";
import { Link } from "@reach/router";

type Props = React.PropsWithChildren<{
  to: string;
  type?: "default" | "brand";
}>;

export const ButtonLink: React.FC<Props> = (props: Props) => {
  const buttonType = props.type || "default";

  const classes = classNames(
    [
      "inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium rounded-md focus:outline-none transition duration-150 ease-in-out"
    ],
    {
      "border-gray-300 text-gray-700 bg-white hover:text-gray-500 focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800":
        buttonType == "default",
      "border-transparent text-white bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700":
        buttonType == "brand"
    }
  );

  return (
    <Link to={props.to} className={classes}>
      {props.children}
    </Link>
  );
};
