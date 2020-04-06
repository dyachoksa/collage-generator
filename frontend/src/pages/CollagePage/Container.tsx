import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "@reach/router";

import { collagesApi } from "~/api";
import { Collage, Image } from "~/models/entities";

import { Component } from "./Component";

export const Container: React.FC = () => {
  const [collage, setCollage] = useState<Collage>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const params = useParams();
  const collageId = params.collageId;

  useEffect(() => {
    setLoading(true);

    collagesApi
      .getOne(collageId)
      .then(data => setCollage(data.result))
      .catch(err => {
        setError("Can't load collage");
        console.warn(err);
      })
      .finally(() => setLoading(false));
  }, [collageId]);

  const handleCollageChanged = useCallback(
    (collage: Collage) => setCollage(collage),
    []
  );

  const handleDeleteCollage = useCallback(() => {
    return navigate("/collages");
  }, [navigate]);

  const handleDeleteImage = useCallback(
    (image: Image) => {
      if (confirm("Delete image?")) {
        collagesApi
          .deleteImage(collageId, image.name)
          .then(res => res.result)
          .then(setCollage);
      }
    },
    [collageId]
  );

  const handleEditText = useCallback(
    field => {
      return newValue => {
        const updatedCollage = { ...collage, [field]: newValue };
        return collagesApi
          .update(updatedCollage)
          .then(res => res.result)
          .then(setCollage);
      };
    },
    [collage]
  );

  return (
    <Component
      collage={collage}
      isLoading={isLoading}
      error={error}
      onDeleteCollage={handleDeleteCollage}
      onDeleteImage={handleDeleteImage}
      onCollageGenerated={handleCollageChanged}
      onAfterImageUpload={handleCollageChanged}
      onEditTitle={handleEditText("title")}
      onDescriptionEdit={handleEditText("description")}
    />
  );
};
