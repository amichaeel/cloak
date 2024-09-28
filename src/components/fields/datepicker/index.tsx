// ~/components/fields/datepicker.tsx

"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

interface DateInputProps {
  label: string
  name: string
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  onLabelChange?: (label: string) => void
  isBuilder?: boolean
  required?: boolean
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
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
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {isBuilder ? (
        // Display a disabled button or placeholder in the form builder
        <Button variant="outline" className="w-full justify-start" disabled>
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{value ? format(value, "PPP") : "Date Picker"}</span>
        </Button>
      ) : (
        // Active date picker for end-users
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
