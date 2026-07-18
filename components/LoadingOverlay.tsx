"use client";

import { Loader2 } from "lucide-react";

function LoadingOverlay() {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-[var(--bg-primary)] border border-[var(--border-subtle)] shadow-soft-lg">
        <div className="loading-shadow">
          <Loader2 className="loading-animation size-10 text-[var(--color-brand)]" />
          <div className="text-center space-y-2">
            <p className="loading-title font-serif">Brewing your manuscript</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Uploading files and preparing synthesis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoadingOverlay };
