import * as React from "react";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

import { collagesApi } from "~/api";
import { Collage } from "~/models/entities";
import { Button } from "~/components/ui";

type Props = {
  collageId: number;
  onCollageGenerated: (collage: Collage) => void;
  title?: string;
};

export const GenerateButton: React.FC<Props> = (props: Props) => {
  const { collageId, onCollageGenerated } = props;
  const [isProcessing, setProcessing] = useState(false);

  const handleClick = useCallback(() => {
    setProcessing(true);

    collagesApi
      .generateCollage(collageId)
      .then(res => {
        setProcessing(false);
        return res.result;
      })
      .then(onCollageGenerated)
      .catch(() => setProcessing(false));
  }, [collageId, onCollageGenerated]);

  return (
    <Button type="button" onClick={handleClick} disabled={isProcessing} wide>
      {isProcessing ? (
        <FontAwesomeIcon icon={faYinYang} size="lg" spin />
      ) : (
        props.title || "Generate"
      )}
    </Button>
  );
};
