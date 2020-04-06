import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

export const FullPageLoader: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <span className="text-indigo-500 text-4xl">
        <FontAwesomeIcon icon={faYinYang} spin />
      </span>
    </div>
  );
};
