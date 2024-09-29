import React from "react"
import { Checkbox } from "~/components/ui/checkbox"
import { OptionsEditor } from "~/components/fields/optionseditor"

interface Option {
  id: string
  label: string
  value: string
}

interface CheckboxInputProps {
  label?: string
  name?: string
  options?: Option[]
  selectedOptions?: string[]
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
  selectedOptions = [],
  onChange,
  onLabelChange,
  onOptionsChange,
  isBuilder = false,
  required = false,
}) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLabelChange?.(e.target.value)
  }

  const handleOptionsChange = (newOptions: Option[]) => {
    onOptionsChange?.(newOptions)
  }

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (onChange) {
      const newSelectedOptions = checked
        ? [...selectedOptions, optionValue]
        : selectedOptions.filter((val) => val !== optionValue)
      onChange(newSelectedOptions)
    }
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
          <OptionsEditor
            options={options}
            onOptionsChange={handleOptionsChange}
            controlType="checkbox"
          />
        </>
      ) : (
        <>
          <label className="label mb-2 block font-medium">
            {label}
            {required && <span className="text-red-500">*</span>}
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