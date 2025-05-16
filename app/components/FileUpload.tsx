"use client";

import { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils"; // if you use utility classnames

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video size must be less than 100MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or WebP)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === "video" ? "/videos" : "/images"}
        className={cn(
          "w-full px-4 py-2 text-sm border border-input rounded-xl bg-background",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0",
          "file:text-sm file:font-medium file:bg-muted file:text-muted-foreground",
          "hover:file:bg-muted/80 transition"
        )}
        accept={fileType === "video" ? "video/*" : "image/*"}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-destructive font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
