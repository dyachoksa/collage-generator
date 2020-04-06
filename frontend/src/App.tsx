import * as React from "react";
import { Router } from "@reach/router";

import {
  CollagePage,
  CollagesPage,
  HomePage,
  LoginPage,
  ProfilePage,
  ProtectedPage,
  RegisterPage
} from "~/pages";
import { useEffect } from "react";
import { useAuth } from "~/hooks";

const App: React.FC = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) checkAuth();
  }, [isAuthenticated, checkAuth]);

  return (
    <Router className="h-full">
      <HomePage path="/" />
      <LoginPage path="login" />
      <RegisterPage path="register" />

      <ProtectedPage path="profile" component={ProfilePage} />
      <ProtectedPage path="collages" component={CollagesPage} />
      <ProtectedPage path="collages/:collageId" component={CollagePage} />
    </Router>
  );
};

export default App;
