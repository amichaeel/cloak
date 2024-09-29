import React, { useState, useEffect } from "react"
import { Checkbox } from "~/components/ui/checkbox"

interface Option {
  id: string
  label: string
  value: string
}

interface CheckboxInputProps {
  label?: string
  name?: string
  options?: Option[]
  values?: string[]
  onChange?: (selectedOptions: string[]) => void
  onLabelChange?: (label: string) => void
  onOptionsChange?: (options: Option[]) => void
  isBuilder?: boolean
  required?: boolean
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label = "",
  name = "",
  options = [],
  values = [],
  onChange,
  onLabelChange,
  onOptionsChange,
  isBuilder = false,
  required = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(values);

  useEffect(() => {
    setSelectedOptions(values);
  }, [values]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLabelChange?.(e.target.value)
  }

  const handleOptionsChange = (newOptions: Option[]) => {
    onOptionsChange?.(newOptions)
  }

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const newSelectedOptions = checked
      ? [...selectedOptions, optionValue]
      : selectedOptions.filter((val) => val !== optionValue);

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  }

  return (
    <div className="field mb-4">
      {isBuilder ? (
        <>
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            placeholder="Question"
            className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
          />
          {/* Add your OptionsEditor component here */}
        </>
      ) : (
        <>
          <label className="label mb-2 block font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          {options.map((option) => (
            <div key={option.id} className="flex items-center mb-2">
              <Checkbox
                id={`${name}-${option.id}`}
                checked={selectedOptions.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked as boolean)
                }
              />
              <label htmlFor={`${name}-${option.id}`} className="ml-2">
                {option.label}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  )
}