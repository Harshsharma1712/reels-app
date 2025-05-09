"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genres: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      genres: ""
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-xl mx-auto bg-gray-900 text-gray-100 p-8 rounded-2xl shadow-md space-y-6"
>
  <div className="form-control w-full">
    <label className="label text-sm font-medium text-gray-300 mb-1">
      Title
    </label>
    <input
      type="text"
      className={`input input-bordered w-full bg-gray-800 text-white border-gray-700 focus:border-primary focus:outline-none ${
        errors.title ? "border-red-500" : ""
      }`}
      {...register("title", { required: "Title is required" })}
    />
    {errors.title && (
      <span className="text-red-500 text-sm mt-1">
        {errors.title.message}
      </span>
    )}
  </div>

  <div className="form-control w-full">
  <label className="label text-sm font-medium text-gray-300 mb-1">
    Genres
  </label>
  <input
    type="text"
    className={`input input-bordered w-full bg-gray-800 text-white border-gray-700 focus:border-primary focus:outline-none ${
      errors.genres ? "border-red-500" : ""
    }`}
    {...register("genres", { required: "Genres are required" })}
  />
  {errors.genres && (
    <span className="text-red-500 text-sm mt-1">
      {errors.genres.message}
    </span>
  )}
</div>

  <div className="form-control w-full">
    <label className="label text-sm font-medium text-gray-300 mb-1">
      Description
    </label>
    <textarea
      className={`textarea textarea-bordered h-28 w-full resize-none bg-gray-800 text-white border-gray-700 focus:border-primary focus:outline-none ${
        errors.description ? "border-red-500" : ""
      }`}
      {...register("description", { required: "Description is required" })}
    />
    {errors.description && (
      <span className="text-red-500 text-sm mt-1">
        {errors.description.message}
      </span>
    )}
  </div>

  <div className="form-control w-full">
    <label className="label text-sm font-medium text-gray-300 mb-2">
      Upload Video
    </label>
    <FileUpload
      fileType="video"
      onSuccess={handleUploadSuccess}
      onProgress={handleUploadProgress}
    />
    {uploadProgress > 0 && (
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
    )}
  </div>

  <button
    type="submit"
    className="btn btn-primary btn-block mt-4"
    disabled={loading || !uploadProgress}
  >
    {loading ? (
      <>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Publishing Video...
      </>
    ) : (
      "Publish Video"
    )}
  </button>
</form>

  );
}