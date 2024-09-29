"use client"

import React, { useState, useEffect } from "react"
import { OptionsEditor } from "~/components/fields/optionseditor"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Check, ChevronDown } from "lucide-react"

interface Option {
  id: string
  value: string
  label: string
}

interface DropdownInputProps {
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

export const DropdownInput: React.FC<DropdownInputProps> = ({
  label = "",
  name = "",
  value = "",
  options = [],
  onChange,
  onLabelChange,
  onOptionsChange,
  isBuilder = false,
  required = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLabelChange?.(e.target.value)
  }

  const handleOptionsChange = (newOptions: Option[]) => {
    onOptionsChange?.(newOptions)
  }

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onChange?.(newValue)
  }

  const selectedOption = options.find(option => option.value === selectedValue)

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
            required={required}
          />
          <OptionsEditor
            options={options}
            onOptionsChange={handleOptionsChange}
            controlType="none"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full cursor-not-allowed" disabled>
                Preview Dropdown
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="">
                {options.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          {label && (
            <label className="label mb-2 block font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                aria-label={`Select ${label}`}
              >
                {selectedOption ? selectedOption.label : "Select an option"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={selectedValue} onValueChange={handleValueChange}>
                {options.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      {option.label}
                      {option.value === selectedValue && <Check className="h-4 w-4" />}
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  )
}