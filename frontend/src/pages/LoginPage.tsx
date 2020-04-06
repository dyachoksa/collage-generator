import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect, RouteComponentProps } from "@reach/router";

import { useAuth } from "~/hooks";
import { LoginData } from "~/models/forms";

import { RegularPageLayout } from "~/components/layout";
import { Input } from "~/components/forms";
import { Alert, Button } from "~/components/ui";

type Props = RouteComponentProps & {};

export const LoginPage: React.FC<Props> = () => {
  const { register, handleSubmit, errors } = useForm<LoginData>();
  const { isAuthenticated, login, error } = useAuth();

  const submitHandler = useCallback(
    (data: LoginData) => {
      login(data);
    },
    [login]
  );

  if (isAuthenticated) {
    return <Redirect to="/collages" noThrow />;
  }

  return (
    <RegularPageLayout>
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col w-72">
          <h1 className="page-title">Login</h1>

          {error && <Alert message={error} type="error" />}

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mt-4">
              <Input
                ref={register({ required: "Email is required" })}
                type="email"
                name="email"
                placeholder="Email address"
                aria-label="Email address"
                autoComplete="username"
                hasError={!!errors.email}
                required
              />
            </div>
            {errors.email && (
              <div className="mt-1 text-sm text-red-500">{errors.email.message}</div>
            )}

            <div className="mt-4">
              <Input
                ref={register}
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                autoComplete="current-password"
                hasError={!!errors.password}
                required
              />
            </div>
            {errors.password && (
              <div className="mt-1 text-sm text-red-500">{errors.password.message}</div>
            )}

            <div className="mt-4 flex flex-row justify-between items-center">
              <Button type="submit">Log in</Button>
              <div>
                <a href="#">Forgot your password?</a>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-base">
                <span className="text-gray-600">{"Don't"} have an account?</span>{" "}
                <Link to="/register">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </RegularPageLayout>
  );
};
