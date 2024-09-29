// ~/components/fields/textarea.tsx

import React from "react";
import { Textarea } from "~/components/ui/textarea";

interface TextAreaProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLabelChange?: (label: string) => void;
  isBuilder?: boolean;
  required?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value = "",
  onChange,
  onLabelChange,
  isBuilder = false,
  required = false,
}) => {
  return (
    <div className="field mb-4">
      {isBuilder ? (
        // Editable label in form builder
        <input
          type="text"
          value={label}
          onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
          placeholder="Question"
          className="label-input mb-2 block w-full rounded-lg border-neutral-300 bg-neutral-800 p-2 focus:bg-neutral-700 focus:outline-none"
        />
      ) : (
        // Static label for end-users
        <label htmlFor={name} className="label mb-2 block font-medium">
          {required && <span className="text-red-500">Required</span>}
        </label>
      )}
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={isBuilder} // Disable textarea in form builder
        placeholder={isBuilder ? "Long response" : ""}
        className="textarea w-full"
        required={required && !isBuilder} // Apply 'required' attribute for end-users
      />
    </div>
  );
};
