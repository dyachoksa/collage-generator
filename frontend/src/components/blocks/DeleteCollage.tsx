import * as React from "react";
import { useCallback } from "react";

import { collagesApi } from "~/api";
import { Button } from "~/components/ui";

type Props = React.PropsWithChildren<{
  collageId: number;
  onDelete: () => void;
  btnSize?: "sm" | "base";
}>;

export const DeleteCollage: React.FC<Props> = (props: Props) => {
  const { collageId, onDelete } = props;

  // todo: add error context
  // ...

  const handleDeleteCollage = useCallback(() => {
    if (confirm("Delete collage? All related data will be lost.")) {
      collagesApi
        .remove(collageId)
        .then(onDelete)
        .catch(console.warn);
    }
  }, [onDelete, collageId]);

  return (
    <Button
      btnSize={props.btnSize}
      color="red"
      onClick={handleDeleteCollage}
      title="Delete collage"
    >
      {props.children}
    </Button>
  );
};
