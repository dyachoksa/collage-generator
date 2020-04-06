import * as React from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Collage } from "~/models/entities";
import { RegularPageLayout } from "~/components/layout";
import { FullPageLoader, NoImage } from "~/components/elements";
import { Alert } from "~/components/ui";
import { DeleteCollage, ImageWithLightbox } from "~/components/blocks";

import { AddCollage } from "./AddCollage";

type DeleteHandler = () => void;

type Props = {
  collages: Collage[];
  isLoading: boolean;
  error?: string;
  onDeleteCollage: (collageId: number) => DeleteHandler;
};

const getCollageLink = (collage: Collage) => `/collages/${collage.id}`;

const renderContent = (props: Props) => (
  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div>
      <AddCollage />
    </div>

    {props.collages.map(collage => (
      <div
        className="bg-white overflow-hidden shadow rounded border flex flex-col"
        key={collage.id}
      >
        <div className="px-4 py-5 sm:p-6 flex flex-grow items-center justify-center">
          {collage.image && (
            <ImageWithLightbox
              url={collage.image.url}
              title={collage.title}
              className="w-full h-auto cursor-pointer"
            />
          )}
          {!collage.image && <NoImage full />}
        </div>
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between items-center">
          <Link to={getCollageLink(collage)} className="font-bold">
            {collage.title ? collage.title : "My collage"}
          </Link>

          <DeleteCollage
            btnSize="sm"
            collageId={collage.id}
            onDelete={props.onDeleteCollage(collage.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteCollage>
        </div>
      </div>
    ))}
  </div>
);

export const Component: React.FC<Props> = (props: Props) => {
  const { error, isLoading } = props;

  return (
    <RegularPageLayout>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="page-title">Collages</h1>
        </div>
      </div>

      {isLoading && <FullPageLoader />}

      {!isLoading && error && (
        <div className="mt-1">
          <Alert message={error} type="error" />
        </div>
      )}

      {!isLoading && !error && renderContent(props)}
    </RegularPageLayout>
  );
};
