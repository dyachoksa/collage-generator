import * as React from "react";
import { useCallback } from "react";

type Props = React.PropsWithChildren<{
  show: boolean;
  onClose: () => void;
}>;

export const Modal: React.FC<Props> = (props: Props) => {
  const { onClose } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!props.show) {
    return null;
  }

  return (
    <div className="">
      <button type="button" onClick={handleClose}>
        x
      </button>
      {props.children}
    </div>
  );
};
