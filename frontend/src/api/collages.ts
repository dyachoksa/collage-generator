import { CollageResponse, CollagesResponse } from "~/models/http";
import { CollageBasicData } from "~/models/forms";
import { Collage } from "~/models/entities";

import { baseApi } from "./base";

// Get user's collages
const getList = async () =>
  baseApi.get<CollagesResponse>("collages").then(response => response.data);

// Get collage by id
const getOne = async (collage_id: number) =>
  baseApi.get<CollageResponse>(`collages/${collage_id}`).then(res => res.data);

// Create a new collage
const create = async (data: CollageBasicData) =>
  baseApi.post<CollageResponse>("collages", data).then(res => res.data);

// Update collage
const update = async (collage: Collage) =>
  baseApi
    .put<CollageResponse>(`collages/${collage.id}`, {
      title: collage.title,
      description: collage.description
    })
    .then(res => res.data);

// Remove collage
const remove = async (collageId: number) => baseApi.delete(`collages/${collageId}`);

// Add image to collage
const uploadImages = async (collageId: number, data: FormData) =>
  baseApi
    .post<CollageResponse>("images", data, { params: { collage_id: collageId } })
    .then(res => res.data);

// Remove image from collage
const deleteImage = async (collageId: number, name: string) =>
  baseApi
    .delete<CollageResponse>(`images/${name}`, { params: { collage_id: collageId } })
    .then(res => res.data);

// Generate collage from uploaded images
const generateCollage = async (collageId: number) =>
  baseApi.post<CollageResponse>(`collages/${collageId}/create`).then(res => res.data);

export const collagesApi = {
  getList,
  getOne,
  create,
  update,
  remove,
  uploadImages,
  deleteImage,
  generateCollage
};
