"use client";

import { useCallback, useEffect, useState } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type UploadPublicFileComponentProps = {
  onUploadComplete: (uploadData: string) => void;
  initialImageUrl?: string;
};

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unexpected file reader result"));
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Unable to read file"));
    };
    reader.readAsDataURL(file);
  });

const UploadPublicFileComponent = ({
  onUploadComplete,
  initialImageUrl,
}: UploadPublicFileComponentProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl ?? "");

  useEffect(() => {
    setPreviewUrl(initialImageUrl ?? "");
  }, [initialImageUrl]);

  const handleCoverImageChange = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please choose an image file");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File too large. Please select a file under 5MB");
        return;
      }

      setIsLoading(true);
      try {
        const dataUrl = await readFileAsDataUrl(file);
        setPreviewUrl(dataUrl);
        onUploadComplete(dataUrl);
      } catch (error) {
        console.error("Error reading image", error);
        toast.error("Error reading image. Please try again");
      } finally {
        setIsLoading(false);
      }
    },
    [onUploadComplete]
  );

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast.error(
      `${file.file.type || "Selected"} file type is not supported. Please choose a PNG, JPG, or JPEG image instead.`
    );
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    setIsDragOver(false);
    acceptedFiles.forEach((file) => handleCoverImageChange(file));
  };

  return (
    <div
      className={cn(
        "relative my-4 flex w-full flex-col items-center justify-center rounded-xl border-4 border-dotted bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex w-full flex-col items-center justify-center">
        <Dropzone
          disabled={isLoading}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="flex w-full flex-1 flex-col items-center justify-center gap-3 py-6"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {previewUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={previewUrl}
                    alt="Organization"
                    className="h-20 w-20 rounded-lg object-cover shadow"
                  />
                  <p className="text-sm text-zinc-700">
                    Click or drop to replace
                  </p>
                </div>
              ) : isDragOver ? (
                <MousePointerSquareDashed className="mb-2 h-6 w-6 text-zinc-500" />
              ) : isLoading ? (
                <Loader2 className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
              ) : (
                <ImageIcon className="mb-2 h-6 w-6 text-zinc-500" />
              )}
              <div className="flex flex-col items-center justify-center text-sm text-zinc-700">
                {isLoading ? (
                  <p>Loading image...</p>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
              <p className="text-xs text-zinc-500">PNG, JPG, JPEG up to 5MB.</p>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default UploadPublicFileComponent;
