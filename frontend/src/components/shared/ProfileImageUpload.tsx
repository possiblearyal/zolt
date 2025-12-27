"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AvatarGallery from "./AvatarGallery";
import { toast } from "sonner";

type ImageCompProps = {
  value?: string;
  onChange: (url: string) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const AvatarPreview: React.FC<{ src?: string }> = ({ src }) => {
  if (!src) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-gray-400">
        <ImageIcon className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="h-20 w-20 overflow-hidden rounded-full border shadow-sm">
      <img
        src={src}
        alt="Organization"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

const ImageComp: React.FC<ImageCompProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string>(value ?? "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPreview(value ?? "");
  }, [value]);

  const handlePick = (url: string) => {
    setPreview(url);
    onChange(url);
    setOpen(false);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be under 5MB");
      return;
    }

    setIsLoading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPreview(dataUrl);
      onChange(dataUrl);
    } catch (err) {
      console.error(err);
      toast.error("Could not read image");
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
    e.target.value = "";
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await processFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-3">
        <div
          {...getRootProps()}
          className={`relative cursor-pointer transition-all ${
            isDragActive
              ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
              : "hover:opacity-80"
          }`}
        >
          <input {...getInputProps()} />
          <AvatarPreview src={preview} />
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500/20">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <Upload className="h-4 w-4" />
            Upload custom
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer" asChild>
              <Button type="button" size="sm" variant="outline">
                Choose preset
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-xl"
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
              }}
            >
              <DialogHeader>
                <DialogTitle>Choose a preset</DialogTitle>
                <DialogDescription>
                  Pick a quick preset for your organization image.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2">
                <AvatarGallery setPreBuildAvatar={handlePick} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png, image/svg+xml, image/jpg"
        className="hidden cursor-pointer"
        onChange={onFileChange}
      />
      {isLoading && <p className="text-xs text-gray-500">Reading image...</p>}
    </div>
  );
};

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unexpected result"));
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Unable to read file"));
    };
    reader.readAsDataURL(file);
  });

export default ImageComp;
