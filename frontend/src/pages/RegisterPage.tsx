import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect, RouteComponentProps } from "@reach/router";

import { useAuth } from "~/hooks";
import { RegisterData } from "~/models/forms";

import { RegularPageLayout } from "~/components/layout";
import { Input } from "~/components/forms";
import { Alert, Button } from "~/components/ui";

type Props = RouteComponentProps & {};

export const RegisterPage: React.FC<Props> = () => {
  const { register: registerField, handleSubmit, errors } = useForm<RegisterData>();
  const { isAuthenticated, register, error } = useAuth();

  const submitHandler = useCallback(
    (data: RegisterData) => {
      register(data);
    },
    [register]
  );

  if (isAuthenticated) {
    return <Redirect to="/collages" noThrow />;
  }

  return (
    <RegularPageLayout>
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col w-72">
          <h1 className="page-title">Register</h1>

          {error && <Alert message={error} type="error" />}

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mt-4">
              <Input
                ref={registerField({ required: "Email is required" })}
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
                ref={registerField}
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                autoComplete="new-password"
                hasError={!!errors.password}
                required
              />
            </div>
            {errors.password && (
              <div className="mt-1 text-sm text-red-500">{errors.password.message}</div>
            )}

            <div className="mt-4">
              <Input
                ref={registerField}
                type="text"
                name="first_name"
                placeholder="First name"
                aria-label="First name"
                hasError={!!errors.first_name}
              />
            </div>
            {errors.first_name && (
              <div className="mt-1 text-sm text-red-500">
                {errors.first_name.message}
              </div>
            )}

            <div className="mt-4">
              <Input
                ref={registerField}
                type="text"
                name="last_name"
                placeholder="Last name"
                aria-label="Last name"
                hasError={!!errors.last_name}
              />
            </div>
            {errors.last_name && (
              <div className="mt-1 text-sm text-red-500">
                {errors.last_name.message}
              </div>
            )}

            <div className="mt-4 flex flex-row justify-between items-center">
              <Button type="submit">Sign up</Button>
            </div>

            <div className="mt-8">
              <p className="text-base">
                <span className="text-gray-600">Already have an account?</span>{" "}
                <Link to="/login">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </RegularPageLayout>
  );
};
