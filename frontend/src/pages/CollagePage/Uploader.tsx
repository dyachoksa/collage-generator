import * as React from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

import { collagesApi } from "~/api";
import { Collage } from "~/models/entities";

type Props = {
  collageId: number;
  onAfterImageUpload?: (collage: Collage) => void;
};

export const Uploader: React.FC<Props> = (props: Props) => {
  const [isUploading, setUploading] = useState(false);
  const { collageId, onAfterImageUpload } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length == 0) {
        return;
      }

      setUploading(true);

      const data = acceptedFiles.reduce((acc, image) => {
        acc.append("image", image);
        return acc;
      }, new FormData());

      collagesApi
        .uploadImages(collageId, data)
        .then(res => res.result)
        .then(collage => {
          if (onAfterImageUpload) {
            onAfterImageUpload(collage);
          }
        })
        .finally(() => setUploading(false));
    },
    [collageId, onAfterImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: ["image/jpeg", "image/png"],
    maxSize: 5242880 // ~5M
  });

  const classes = classNames(
    [
      "flex justify-center items-center px-6 py-12 border border-gray-300 border-dashed rounded"
    ],
    { "opacity-75": isDragActive }
  );

  return (
    <div {...getRootProps()} className={classes}>
      {isUploading && <FontAwesomeIcon icon={faYinYang} size="3x" spin />}
      {!isUploading && (
        <div className="text-center">
          <input {...getInputProps()} />
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-1 text-sm text-gray-600">
            {!isDragActive && (
              <>
                <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                  Upload a file
                </span>{" "}
                or drag and drop
              </>
            )}
            {isDragActive && "Drop the files here..."}
          </p>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
        </div>
      )}
    </div>
  );
};
