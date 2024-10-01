// ~/components/fields/textarea.tsx

import React, { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { FaMagic } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);
  const openaiMutation = api.openai.generateText.useMutation();

  const handleProfessionalize = async () => {
    if (!value) return;

    setIsLoading(true);
    try {
      const result = await openaiMutation.mutateAsync({
        prompt: `Rewrite the following text to maintain its core message and sentiment, while:
                  1. Removing any personally identifiable information (PII) such as names, specific locations, or unique personal experiences.
                  2. Standardizing the vocabulary and writing style to a neutral, professional tone.
                  3. Preserving the general opinion and feedback expressed.
                  4. Ensuring the response remains relevant to a workplace or educational context.

                  Original text: ${value}

                  Please provide a rewritten version that adheres to these guidelines.`,
      });

      if (onChange) {
        const syntheticEvent = {
          target: { value: result },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }
    } catch (error) {
      console.error("Error professionalizing text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="field mb-4">
      {isBuilder ? (
        // Editable label in form builder
        <input
          type="text"
          value={label}
          onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
          placeholder="Question"
          className="label-input mb-2 block w-full rounded-lg bg-neutral-800 p-2 shadow-xl focus:bg-neutral-700 focus:outline-none"
        />
      ) : (
        // Static label for end-users
        <label htmlFor={name} className="label mb-2 block font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={isBuilder} // Disable textarea in form builder
          placeholder={isBuilder ? "Long response" : ""}
          className="textarea w-full pr-10"
          required={required && !isBuilder} // Apply 'required' attribute for end-users
        />
        {!isBuilder && (
          <button
            type="button"
            onClick={handleProfessionalize}
            disabled={isLoading}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Professionalize text"
          >
            <FaMagic className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
};
