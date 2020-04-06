import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { Collage } from "~/models/entities";

import { Component } from "./Component";
import { collagesApi } from "~/api";

export const Container: React.FC = () => {
  const [collages, setCollages] = useState<Collage[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    collagesApi
      .getList()
      .then(res => setCollages(res.result))
      .catch(err => {
        setError("Cannot load collages");
        console.warn(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteCollage = useCallback((collageId: number) => {
    return () => {
      setCollages(prevState => prevState.filter(value => value.id != collageId));
    };
  }, []);

  return (
    <Component
      collages={collages}
      isLoading={isLoading}
      error={error}
      onDeleteCollage={handleDeleteCollage}
    />
  );
};
