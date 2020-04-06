import * as React from "react";

type Props = React.PropsWithChildren<{}>;

export const BlankPageLayout: React.FC<Props> = (props: Props) => (
  <div className="h-full flex flex-col">{props.children}</div>
);
