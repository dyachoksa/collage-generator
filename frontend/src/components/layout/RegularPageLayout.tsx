import * as React from "react";

import { LayoutContainer } from "./LayoutContainer";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = React.PropsWithChildren<{}>;

export const RegularPageLayout: React.FC<Props> = (props: Props) => (
  <LayoutContainer>
    <Header />

    <div className="container mx-auto my-2 px-4 sm:px-6 sm:py-6 lg:px-8 flex-grow">
      {props.children}
    </div>

    <Footer />
  </LayoutContainer>
);
