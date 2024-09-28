// ~/components/fields/optionseditor.tsx

import React, { useState } from "react"
import { Checkbox } from "~/components/ui/checkbox"
import { RadioGroupItem } from "~/components/ui/radio-group"
import { TrashIcon } from "@radix-ui/react-icons"

interface Option {
  id: string
  label: string
  value: string
}

type ControlType = "checkbox" | "radio" | "none"

interface OptionsEditorProps {
  options: Option[]
  onOptionsChange: (options: Option[]) => void
  controlType?: ControlType
}

export const OptionsEditor: React.FC<OptionsEditorProps> = ({
  options,
  onOptionsChange,
  controlType = "none",
}) => {
  const [localOptions, setLocalOptions] = useState<Option[]>(options)

  const handleOptionChange = (id: string, label: string) => {
    const updatedOptions = localOptions.map((option) =>
      option.id === id ? { ...option, label } : option
    )
    setLocalOptions(updatedOptions)
    onOptionsChange(updatedOptions)
  }

  const addOption = () => {
    const newOption = {
      id: Date.now().toString(),
      label: "Option",
      value: `option${localOptions.length + 1}`,
    }
    const updatedOptions = [...localOptions, newOption]
    setLocalOptions(updatedOptions)
    onOptionsChange(updatedOptions)
  }

  const removeOption = (id: string) => {
    const updatedOptions = localOptions.filter((option) => option.id !== id)
    setLocalOptions(updatedOptions)
    onOptionsChange(updatedOptions)
  }

  return (
    <div className="options-editor">
      {localOptions.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          {controlType === "checkbox" && <Checkbox disabled className="mr-2" />}
          {controlType === "radio" && (
            <input type="radio" disabled className="mr-2" />
          )}
          <input
            type="text"
            value={option.label}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            className="flex-grow border-b border-gray-300 focus:border-black focus:outline-none"
          />
          <button
            onClick={() => removeOption(option.id)}
            className="ml-2 text-red-500"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
      <button onClick={addOption} className="mt-2 text-blue-500">
        + Add Option
      </button>
    </div>
  )
}
