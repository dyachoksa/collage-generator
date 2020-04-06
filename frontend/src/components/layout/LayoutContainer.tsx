import * as React from "react";

type Props = React.PropsWithChildren<{}>;

export const LayoutContainer: React.FC<Props> = (props: Props) => (
  <div className="flex flex-col h-full">{props.children}</div>
);
