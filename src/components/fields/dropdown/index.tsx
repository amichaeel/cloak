import React from "react"
import { OptionsEditor } from "~/components/fields/optionseditor"
import { MultiSelectCombobox } from "../multiselect-combobox"

interface Option {
  id: string
  value: string
  label: string
}

interface DropdownInputProps {
  label: string
  name: string
  values?: string[]
  options: Option[]
  onChange?: (values: string[]) => void
  onLabelChange?: (label: string) => void
  onOptionsChange?: (options: Option[]) => void
  isBuilder?: boolean
  required?: boolean
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  name,
  values = [],
  options,
  onChange,
  onLabelChange,
  onOptionsChange,
  isBuilder = false,
  required = false,
}) => {
  return (
    <div className="field mb-4">
      <input
        type="text"
        value={label}
        onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
        placeholder="Question"
        className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
      />
      {isBuilder ? (
        <>
          {/* Use controlType="none" to avoid displaying checkboxes */}
          <OptionsEditor
            options={options}
            onOptionsChange={() => onOptionsChange}
            controlType="none"
          />
          {/* Render a disabled MultiSelectCombobox for visual representation */}
          <MultiSelectCombobox
            name={name}
            values={values}
            options={options.map(({ value, label }) => ({ value, label }))}
            onChange={() => { }}
            required={required}
            isDisabled={true}
          />
        </>
      ) : (
        <>
          <label className="label mb-2 block font-medium">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
          <MultiSelectCombobox
            name={name}
            values={values}
            options={options.map(({ value, label }) => ({ value, label }))}
            onChange={() => onChange}
            required={required}
          />
        </>
      )}
    </div>
  )
}
