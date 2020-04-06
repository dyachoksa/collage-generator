import * as React from "react";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { Input } from "~/components/forms";
import { Button } from "~/components/ui";

type Props = React.PropsWithChildren<{
  value: string;
  size?: "base" | "sm" | "lg";
  onEdit?: (newValue: string) => Promise<void>;
}>;

interface FormData {
  value: string;
}

export const EditableText: React.FC<Props> = (props: Props) => {
  const { value, onEdit } = props;
  const size = props.size || "base";

  const [isEditing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const { register, handleSubmit, errors } = useForm<FormData>();

  const handleEdit = useCallback(
    (data: FormData) => {
      setError(null);

      if (onEdit) {
        onEdit(data.value)
          .then(() => setEditing(false))
          .catch(err => {
            console.warn(err);
            setError("Cannot update");
          });
      }
    },
    [onEdit]
  );

  const toggleEditing = useCallback(() => setEditing(prevState => !prevState), []);

  const editBtnClasses = classNames("ml-2 text-gray-300 hover:text-gray-500", {
    "text-lg sm:text-xl": size == "lg",
    "w-4 h-4": size == "sm"
  });

  if (!isEditing) {
    return (
      <div className="flex flex-row items-center">
        <div>{props.children}</div>
        <button className={editBtnClasses} onClick={toggleEditing} title="Edit value">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleEdit)}>
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}

      <div className="flex flex-row items-center">
        <div>
          <Input
            ref={register}
            type="text"
            name="value"
            placeholder="Put something here"
            hasError={!!errors.value}
            defaultValue={value}
          />
          {errors.value && (
            <div className="mt-1 text-sm text-red-500">{errors.value.message}</div>
          )}
        </div>

        <div className="ml-1 flex flex-row items-center">
          <Button type="submit">Save</Button>
          <div className="ml-1">
            <Button color="white" onClick={toggleEditing}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
