// ~/components/ui/multiselect-combobox.tsx

"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Checkbox } from "~/components/ui/checkbox"

interface Option {
  value: string
  label: string
}

interface MultiSelectComboboxProps {
  name: string
  values: string[]
  options: Option[]
  onChange?: (values: string[]) => void
  required?: boolean
  isDisabled?: boolean
}

export const MultiSelectCombobox: React.FC<MultiSelectComboboxProps> = ({
  name,
  values,
  options,
  onChange,
  isDisabled = false,
}) => {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  const toggleValue = (value: string) => {
    if (values.includes(value) && onChange) {
      onChange(values.filter((v) => v !== value))
    } else if (onChange) {
      onChange([...values, value])
    }
  }

  return (
    <Popover open={open && !isDisabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isDisabled}
        >
          {values.length > 0
            ? options
              .filter((option) => values.includes(option.value))
              .map((option) => option.label)
              .join(", ")
            : "Select options..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {!isDisabled && (
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleValue(option.value)}
                  >
                    <Checkbox
                      checked={values.includes(option.value)}
                      onCheckedChange={() => toggleValue(option.value)}
                      className="mr-2"
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  )
}
