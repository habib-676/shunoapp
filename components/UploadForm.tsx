"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import FileUploader from "@/components/FileUploader";
import VoiceSelector from "@/components/VoiceSelector";

const MAX_PDF_SIZE = 50 * 1024 * 1024;

const uploadFormSchema = z.object({
  pdfFile: z
    .custom<File>((value) => value instanceof File, {
      message: "Please upload a PDF file",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Please upload a valid PDF file",
    })
    .refine((file) => file.size <= MAX_PDF_SIZE, {
      message: "PDF file must be 50MB or smaller",
    }),
  coverImage: z
    .custom<File | null>((value) => value === null || value instanceof File, {
      message: "Please upload a valid image file",
    })
    .refine((file) => file === null || file.type.startsWith("image/"), {
      message: "Please upload a valid image file",
    })
    .nullable(),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be 120 characters or fewer"),
  author: z
    .string()
    .trim()
    .min(1, "Author name is required")
    .max(120, "Author name must be 120 characters or fewer"),
  voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"]),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema as never) as never,
    defaultValues: {
      pdfFile: undefined,
      coverImage: null,
      title: "",
      author: "",
      voice: "rachel",
    },
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    form.reset({
      pdfFile: undefined,
      coverImage: null,
      title: "",
      author: "",
      voice: "rachel",
    });
  });

  return (
    <div className="new-book-wrapper rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 p-6 shadow-soft-lg md:p-8">
      <Form {...form}>
        <form className="space-y-8" onSubmit={onSubmit} noValidate>
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FileUploader
                  id="book-pdf-file"
                  label="Book PDF File"
                  hint="PDF file (max 50MB)"
                  value={field.value ?? null}
                  onChange={(file) => field.onChange(file ?? undefined)}
                  accept="application/pdf"
                  fileType="pdf"
                  error={fieldState.error?.message}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FileUploader
                  id="cover-image-file"
                  label="Cover Image (Optional)"
                  hint="Leave empty to auto-generate from PDF"
                  value={field.value ?? null}
                  onChange={(file) => field.onChange(file)}
                  accept="image/*"
                  fileType="image"
                  error={fieldState.error?.message}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-3">
                <label className="form-label" htmlFor="book-title">
                  Title
                </label>
                <input
                  id="book-title"
                  {...field}
                  className="form-input border border-[var(--border-subtle)] shadow-soft-sm outline-none transition-all focus:border-[var(--color-brand)]"
                  placeholder="ex: Rich Dad Poor Dad"
                />
                {fieldState.error ? (
                  <p className="text-sm font-medium text-red-600">
                    {fieldState.error.message}
                  </p>
                ) : null}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-3">
                <label className="form-label" htmlFor="author-name">
                  Author Name
                </label>
                <input
                  id="author-name"
                  {...field}
                  className="form-input border border-[var(--border-subtle)] shadow-soft-sm outline-none transition-all focus:border-[var(--color-brand)]"
                  placeholder="ex: Robert Kiyosaki"
                />
                {fieldState.error ? (
                  <p className="text-sm font-medium text-red-600">
                    {fieldState.error.message}
                  </p>
                ) : null}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-3">
                <VoiceSelector
                  value={field.value}
                  onChange={(voice) => field.onChange(voice)}
                  error={fieldState.error?.message}
                />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="form-btn"
            disabled={form.formState.isSubmitting || isSubmitting}
          >
            Begin Synthesis
          </button>
        </form>
      </Form>

      {isSubmitting || form.formState.isSubmitting ? <LoadingOverlay /> : null}
    </div>
  );
}

export default UploadForm;
