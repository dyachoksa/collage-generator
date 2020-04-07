import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "~/hooks";
import { UserEditData } from "~/models/forms";
import { RegularPageLayout } from "~/components/layout";
import { Input } from "~/components/forms";
import { Alert, Button } from "~/components/ui";
import { usersApi } from "~/api";

export const ProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { register, handleSubmit, errors } = useForm<UserEditData>({
    defaultValues: { ...currentUser }
  });
  const [message, setMessage] = useState<string>(null);
  const [error, setError] = useState<string>(null);

  const currentUserEmail = currentUser.email;

  useEffect(() => {
    const timerId = setTimeout(() => setMessage(null), 5000);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [message]);

  const handleSave = useCallback(
    (data: UserEditData) => {
      setMessage(null);
      setError(null);
      usersApi
        .update({ ...data, email: currentUserEmail })
        .then(user => {
          updateCurrentUser(user);
          setMessage("Profile has been successfully updated.");
        })
        .catch(err => {
          console.warn(err);
          setError("Cannot save changes. Please try again later.");
        });
    },
    [currentUserEmail, updateCurrentUser]
  );

  return (
    <RegularPageLayout>
      <div className="mx-auto mt-8 max-w-2xl">
        {message && <Alert message={message} type="success" />}
        {error && <Alert message={error} type="error" />}

        <form onSubmit={handleSubmit(handleSave)}>
          <div>
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="block text-sm font-medium leading-5 text-gray-700">
                  Email address
                </div>
                <div className="mt-2">
                  <span className="font-medium text-indigo-700">
                    {currentUserEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="First name"
                    aria-label="First name"
                    ref={register}
                    hasError={!!errors.first_name}
                  />
                  {errors.first_name && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.first_name.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Last name"
                    aria-label="Last name"
                    ref={register}
                    hasError={!!errors.last_name}
                  />
                  {errors.last_name && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.last_name.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
              <span className="inline-flex rounded-md shadow-sm">
                <Button type="submit">Save</Button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </RegularPageLayout>
  );
};
