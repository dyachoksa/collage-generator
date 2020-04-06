import * as React from "react";
import { Link } from "@reach/router";

type Props = React.PropsWithChildren<{ to: string }>;

export const DropdownLink: React.FC<Props> = (props: Props) => (
  <Link
    to={props.to}
    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
  >
    {props.children}
  </Link>
);
