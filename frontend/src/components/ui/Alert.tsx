import * as React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  message: string;
  type: "error";
};

export const Alert: React.FC<Props> = (props: Props) => {
  const { message } = props;

  const classes = classNames(["mt-4 px-2 py-2 flex items-center border rounded"], {
    "border-red-400 text-red-700 bg-red-100": props.type == "error"
  });

  return (
    <div className={classes}>
      <span>
        <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
      </span>
      <p className="ml-2">{message}</p>
    </div>
  );
};
