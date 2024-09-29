import React from "react"
import { OptionsEditor } from "~/components/fields/optionseditor"
import { MultiSelectCombobox } from "../multiselect-combobox"

interface Option {
  id: string
  value: string
  label: string
}

interface DropdownInputProps {
  label?: string
  name?: string
  values?: string[]
  options?: Option[]
  onChange?: (values: string[]) => void
  onLabelChange?: (label: string) => void
  onOptionsChange?: (options: Option[]) => void
  isBuilder?: boolean
  required?: boolean
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  label = "",
  name = "",
  values = [],
  options = [],
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

  return (
    <div className="field mb-4">
      {isBuilder ? (
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          placeholder="Question"
          className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
        />
      ) : (
        <label className="label mb-2 block font-medium">
          {required && <span className="text-red-500">Required</span>}
        </label>
      )}
      {isBuilder ? (
        <>
          <OptionsEditor
            options={options}
            onOptionsChange={handleOptionsChange}
            controlType="none"
          />
          <MultiSelectCombobox
            name={name}
            values={values}
            options={options.map(({ value, label }) => ({ value, label }))}
            required={required}
            isDisabled={true}
          />
        </>
      ) : (
        <MultiSelectCombobox
          name={name}
          values={values}
          options={options.map(({ value, label }) => ({ value, label }))}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  )
}