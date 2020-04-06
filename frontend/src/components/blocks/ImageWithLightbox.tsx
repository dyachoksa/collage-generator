import * as React from "react";
import { useCallback, useState } from "react";
import { Lightbox } from "react-modal-image";

type Props = {
  url: string;
  title?: string;
  className?: string;
};

export const ImageWithLightbox: React.FC<Props> = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { url, title, className } = props;

  const toggleLightbox = useCallback(() => setOpen(prevState => !prevState), []);

  return (
    <>
      <img src={url} alt={title} className={className} onClick={toggleLightbox} />
      {isOpen && <Lightbox medium={url} onClose={toggleLightbox} alt={title} />}
    </>
  );
};
