"use client";

import { cn } from "@/lib/utils";

type VoiceOption = {
  value: string;
  name: string;
  description: string;
};

type VoiceSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const maleVoices: VoiceOption[] = [
  {
    value: "dave",
    name: "Dave",
    description: "Young male, British-Essex, casual & conversational",
  },
  {
    value: "daniel",
    name: "Daniel",
    description: "Middle-aged male, British, authoritative but warm",
  },
  {
    value: "chris",
    name: "Chris",
    description: "Male, casual & easy-going",
  },
];

const femaleVoices: VoiceOption[] = [
  {
    value: "rachel",
    name: "Rachel",
    description: "Young female, American, calm & clear",
  },
  {
    value: "sarah",
    name: "Sarah",
    description: "Young female, American, soft & approachable",
  },
];

function VoiceSelector({ value, onChange, error }: VoiceSelectorProps) {
  const renderOption = (voice: VoiceOption) => {
    const selected = value === voice.value;

    return (
      <label
        key={voice.value}
        className={cn(
          "voice-selector-option voice-selector-option-default flex items-start gap-3 rounded-[12px] bg-white p-4",
          selected && "voice-selector-option-selected",
        )}
      >
        <input
          type="radio"
          name="voice"
          value={voice.value}
          checked={selected}
          onChange={() => onChange(voice.value)}
          className="mt-1 size-4 shrink-0 accent-[var(--color-brand)]"
        />
        <span className="min-w-0">
          <span className="block text-base font-semibold text-[var(--text-primary)]">
            {voice.name}
          </span>
          <span className="block text-sm leading-5 text-[var(--text-secondary)]">
            {voice.description}
          </span>
        </span>
      </label>
    );
  };

  return (
    <div className="space-y-4">
      <p className="form-label">Choose Assistant Voice</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Male Voices
          </p>
          <div className="voice-selector-options flex flex-col gap-4 md:flex-row">
            {maleVoices.map(renderOption)}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Female Voices
          </p>
          <div className="voice-selector-options flex flex-col gap-4 md:flex-row">
            {femaleVoices.map(renderOption)}
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

export default VoiceSelector;
