"use client";

import * as React from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";

type FileUploaderProps = {
  id: string;
  label: string;
  hint: string;
  value: File | null;
  onChange: (file: File | null) => void;
  accept: string;
  fileType: "pdf" | "image";
  error?: string;
};

function FileUploader({
  id,
  label,
  hint,
  value,
  onChange,
  accept,
  fileType,
  error,
}: FileUploaderProps) {
  const hasValue = value !== null;
  const isPdf = fileType === "pdf";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null);
    event.target.value = "";
  };

  return (
    <div className="space-y-3">
      <p className="form-label">{label}</p>
      <label
        htmlFor={id}
        className={cn(
          "upload-dropzone border-2 border-dashed border-[var(--border-subtle)] px-5 text-center shadow-soft-sm relative overflow-hidden",
          hasValue && "upload-dropzone-uploaded border-[var(--border-medium)]",
          error && "border-red-400",
        )}
      >
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={handleFileChange}
        />

        {hasValue ? (
          <div className="flex w-full items-center justify-between gap-4 px-2">
            <div className="flex min-w-0 items-center gap-4 text-left">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/70 text-[var(--color-brand)]">
                {isPdf ? (
                  <Upload className="size-5" />
                ) : (
                  <ImageIcon className="size-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="upload-dropzone-text truncate text-left font-semibold text-[var(--color-brand)]">
                  {value?.name}
                </p>
                <p className="upload-dropzone-hint text-left">
                  {isPdf ? "PDF file selected" : "Cover image selected"}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label={`Remove ${label.toLowerCase()}`}
              className="upload-dropzone-remove shrink-0"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChange(null);
              }}
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2">
            <div className="rounded-full bg-[var(--accent-light)] p-4 text-[var(--color-brand)] shadow-soft-sm">
              {isPdf ? (
                <Upload className="upload-dropzone-icon" />
              ) : (
                <ImageIcon className="upload-dropzone-icon" />
              )}
            </div>
            <p className="upload-dropzone-text mt-4">
              {isPdf ? "Click to upload PDF" : "Click to upload cover image"}
            </p>
            <p className="upload-dropzone-hint">{hint}</p>
          </div>
        )}
      </label>

      {error ? (
        <p className="text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

export default FileUploader;
