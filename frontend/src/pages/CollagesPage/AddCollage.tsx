import * as React from "react";
import { useCallback, useState } from "react";
import { useNavigate } from "@reach/router";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { collagesApi } from "~/api";
import { PlusCircleIcon } from "~/components/icons";

export const AddCollage: React.FC = () => {
  const [isProcessing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      setProcessing(true);

      collagesApi
        .create({ title: "My Collage" })
        .then(data => navigate(`/collages/${data.result.id}`))
        .catch(err => {
          console.warn(err);
          setProcessing(false);
        });
    },
    [navigate]
  );

  return (
    <button
      onClick={handleClick}
      className="w-full h-full flex flex-col items-center justify-center rounded text-indigo-600 hover:text-indigo-500 border border-dashed border-gray-300 hover:border-gray-200 disabled:opacity-50"
      title="Add new collage"
      disabled={isProcessing}
    >
      {isProcessing && <FontAwesomeIcon icon={faYinYang} size="3x" spin />}
      {!isProcessing && <PlusCircleIcon className="my-6 w-12 h-12" />}
    </button>
  );
};
