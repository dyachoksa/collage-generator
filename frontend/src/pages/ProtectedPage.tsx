import * as React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";

import { useAuth } from "~/hooks";
import { FullPageLoader } from "~/components/elements";

type Props = RouteComponentProps & {
  component: React.ComponentType;
};

export const ProtectedPage: React.FC<Props> = (props: Props) => {
  const { component: Component } = props;

  const { isAuthenticated, isInitialLoad } = useAuth();

  if (isInitialLoad) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" noThrow />;
  }

  return <Component />;
};
