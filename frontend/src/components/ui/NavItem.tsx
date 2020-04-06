import * as React from "react";
import classNames from "classnames";
import { Link, LinkGetProps } from "@reach/router";

type Props = React.PropsWithChildren<{
  to: string;
  isMobile?: boolean;
}>;

const getProps = (isMobile: boolean) => (props: LinkGetProps) => {
  const isActive = props.isCurrent || (props.isPartiallyCurrent && props.href !== "/");

  const classes = classNames(
    {
      "ml-2": !isMobile,
      "mt-1 block": isMobile
    },
    [
      "px-3 py-2",
      "rounded-md font-medium leading-5 hover:text-white",
      "focus:outline-none focus:text-white focus:bg-gray-700",
      "transition duration-150 ease-in-out"
    ],
    {
      "text-sm": !isMobile,
      "text-base": isMobile,
      "text-white bg-gray-900": isActive,
      "text-gray-300 hover:bg-gray-700": !isActive
    }
  );

  return { className: classes };
};

export const NavItem: React.FC<Props> = (props: Props) => (
  <Link to={props.to} getProps={getProps(props.isMobile)}>
    {props.children}
  </Link>
);
