import * as React from "react";
import classNames from "classnames";

import { LogoIcon } from "~/components/icons/LogoIcon";

type Props = {
  full?: boolean;
};

export const NoImage: React.FC<Props> = (props: Props) => {
  const classes = classNames(
    { "w-full h-full sm:w-40 sm:h-48": !props.full, "w-full h-full": props.full },
    ["flex items-center justify-center rounded border border-dashed border-gray-300"]
  );

  return (
    <div className={classes}>
      <span className="py-12 text-indigo-500">
        <LogoIcon className="w-12 h-12" />
      </span>
    </div>
  );
};
