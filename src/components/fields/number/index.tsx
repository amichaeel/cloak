// ~/components/fields/number.tsx

import React from "react"
import { Input } from "~/components/ui/input"

interface NumberInputProps {
  label?: string
  name?: string
  value?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLabelChange?: (label: string) => void
  isBuilder?: boolean
  required?: boolean
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  value = 0,
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
          className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
        />
      ) : (
        // Static label for end-users
        <label htmlFor={name} className="label mb-2 block font-medium">
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type="number"
        disabled={isBuilder} // Disable input in form builder
        placeholder={isBuilder ? "Number" : ""}
        className="input w-full"
        required={required && !isBuilder} // Apply 'required' attribute for end-users
      />
    </div>
  )
}
