import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
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
  options,
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
          <input
            type="text"
            value={label}
            onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
            placeholder="Question"
            className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
          />
          <OptionsEditor
            options={options}
            onOptionsChange={() => onOptionsChange}
            controlType="radio"
          />
        </>
      ) : (
        <>
          <label className="label mb-2 block font-medium">
            {required && <span className="text-red-500">*</span>}
          </label>
          <Select
            value={value}
            onValueChange={onChange}
            required={required}
            name={name}
          >
            <SelectTrigger className="select-trigger w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  )
}