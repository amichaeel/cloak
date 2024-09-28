"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

interface DateRangeInputProps {
  label: string
  name: string
  value?: DateRange | undefined
  onChange?: (dateRange: DateRange | undefined) => void
  onLabelChange?: (label: string) => void
  isBuilder?: boolean
  required?: boolean
  className?: string
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  label,
  name,
  value,
  onChange,
  onLabelChange,
  isBuilder = false,
  required = false,
  className,
}) => {
  return (
    <div className={cn("field mb-4", className)}>
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
          <span>Date Range Picker</span>
        </Button>
      ) : (
        // Active date range picker for end-users
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={name}
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, "LLL dd, y")} -{" "}
                    {format(value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
