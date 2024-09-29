"use client"

import React from "react"
import { OptionsEditor } from "~/components/fields/optionseditor"

interface Option {
  id: string
  value: string
  label: string
}

interface SelectInputProps {
  label?: string
  name?: string
  value?: string
  options?: Option[]
  onChange?: (value: string) => void
  onLabelChange?: (label: string) => void
  onOptionsChange?: (options: Option[]) => void
  isBuilder?: boolean
  required?: boolean
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value = "",
  options = [],
  onChange,
  onLabelChange,
  onOptionsChange,
  isBuilder = false,
  required = false,
}) => {
  return (
    <div className="field mb-4">
      {isBuilder ? (
        <>
          {/* Label Editor */}
          <input
            type="text"
            value={label}
            onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
            placeholder="Question"
            className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
            required={required}
          />
          {/* Options Editor */}
          <OptionsEditor
            options={options}
            onOptionsChange={() => onOptionsChange}
            controlType="radio"
          />
        </>
      ) : (
        <>
          {/* Question Label */}
          {label && (
            <label className="label mb-2 block font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          {/* Radio Buttons */}
          <div className="radio-group">
            {options.map((option) => (
              <label key={option.value} className="radio-label flex items-center mb-2">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange && onChange(option.value)}
                  required={required}
                  className="radio-input mr-2"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
