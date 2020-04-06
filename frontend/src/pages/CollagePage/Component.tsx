import * as React from "react";
import classNames from "classnames";

import { Collage, Image } from "~/models/entities";
import { RegularPageLayout } from "~/components/layout";
import { FullPageLoader } from "~/components/elements";
import { Alert, ButtonLink } from "~/components/ui";
import { LogoIcon } from "~/components/icons/LogoIcon";
import { DeleteCollage, EditableText, ImageWithLightbox } from "~/components/blocks";

import { GenerateButton } from "./GenerateButton";
import { Uploader } from "./Uploader";

type Props = {
  collage: Collage;
  isLoading: boolean;
  error?: string;
  onDeleteCollage: () => void;
  onDeleteImage: (image: Image) => void;
  onCollageGenerated: (collage: Collage) => void;
  onEditTitle: (newValue) => Promise<void>;
  onDescriptionEdit: (newValue) => Promise<void>;
  onAfterImageUpload?: (collage: Collage) => void;
};

const getCollageTitle = (collage: Collage) =>
  collage.title ? collage.title : "My Collage";

const renderContent = (props: Props) => {
  const {
    collage,
    onDeleteCollage,
    onAfterImageUpload,
    onCollageGenerated,
    onEditTitle,
    onDescriptionEdit
  } = props;

  const hasImages = collage.source_images.length > 0;
  const canRegenerate = collage.image && collage.source_images.length >= 3;
  const canGenerate = collage.source_images.length >= 3 && collage.image == null;

  const collageTitle = getCollageTitle(collage);
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <EditableText value={collage.title} size="lg" onEdit={onEditTitle}>
            <h1 className="page-title">{collageTitle}</h1>
          </EditableText>
          <div className="mt-1 sm:mt-0">
            <EditableText
              value={collage.description}
              size="sm"
              onEdit={onDescriptionEdit}
            >
              <div className="mt-2 text-sm leading-5 text-gray-500">
                {collage.description || "Add description..."}
              </div>
            </EditableText>
          </div>
        </div>

        <div className="mt-5 flex sm:mt-0 sm:ml-4">
          <ButtonLink to="/collages">Back</ButtonLink>

          {canRegenerate && (
            <div className="ml-2">
              <GenerateButton
                collageId={collage.id}
                onCollageGenerated={onCollageGenerated}
                title="Re-generate"
              />
            </div>
          )}

          <div className="ml-2">
            <DeleteCollage collageId={collage.id} onDelete={onDeleteCollage}>
              Delete
            </DeleteCollage>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 sm:mr-10">
          {!collage.image && (
            <div className="w-full px-8 py-12 flex flex-col items-center justify-center rounded border border-dashed border-gray-300">
              <p className="text-indigo-500">
                <LogoIcon className="w-12 h-12" />
              </p>
              {canGenerate && (
                <p className="mt-4">
                  <GenerateButton
                    collageId={collage.id}
                    onCollageGenerated={onCollageGenerated}
                  />
                </p>
              )}
              <p className="mt-4 px-12 text-center text-xs text-gray-500">
                <strong>Note: </strong>
                Upload at least 3 images in order to generate your collage
              </p>
            </div>
          )}

          {collage.image && (
            <ImageWithLightbox
              url={collage.image.url}
              title={collage.title}
              className="w-full h-auto cursor-pointer border border-gray-300"
            />
          )}
        </div>
        <div className="w-full mt-4 sm:w-2/3 sm:mt-0">
          <div
            className={classNames("grid grid-cols-1 gap-4", {
              "sm:grid-cols-2 lg:grid-cols-3": hasImages
            })}
          >
            <Uploader collageId={collage.id} onAfterImageUpload={onAfterImageUpload} />

            {collage.source_images.map(image => (
              <div key={image.name} className="relative">
                <ImageWithLightbox
                  url={image.url}
                  title={image.name}
                  className="w-full h-full cursor-pointer object-cover hover:object-scale-down"
                />
                <button
                  onClick={() => props.onDeleteImage(image)}
                  className="absolute right-0 bottom-0 m-1 px-3 py-2 rounded text-red-500 bg-gray-200 opacity-50 hover:opacity-75"
                  title="Delete"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const Component: React.FC<Props> = (props: Props) => (
  <RegularPageLayout>
    {props.isLoading && <FullPageLoader />}
    {props.error && (
      <div className="mt-1">
        <Alert message={props.error} type="error" />
      </div>
    )}
    {props.collage && renderContent(props)}
  </RegularPageLayout>
);
