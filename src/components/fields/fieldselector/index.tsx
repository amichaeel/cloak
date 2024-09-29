"use client";

import React from "react"
import {
  TextIcon,
  TextAlignJustifyIcon,
  CubeIcon,
  CheckIcon,
  SliderIcon,
  ListBulletIcon,
  ChevronDownIcon
} from "@radix-ui/react-icons"
import type { IconProps } from "@radix-ui/react-icons/dist/types"

// import { cn } from "~/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { Button } from "~/components/ui/button"
import { TooltipProvider } from "@radix-ui/react-tooltip"

interface FieldType {
  type: string
  label: string
  Icon: React.FC<IconProps>
}

const fieldTypes: FieldType[] = [
  { type: "text", label: "Text", Icon: TextIcon },
  { type: "textarea", label: "Text Area", Icon: TextAlignJustifyIcon },
  { type: "number", label: "Number", Icon: CubeIcon },
  { type: "checkbox", label: "Checkbox", Icon: CheckIcon },
  { type: "slider", label: "Slider", Icon: SliderIcon },
  { type: "select", label: "Select", Icon: ListBulletIcon },
  { type: "dropdown", label: "Dropdown", Icon: ChevronDownIcon }
]

interface FieldSelectorProps {
  onAddField: (type: string) => void
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({ onAddField }) => {
  return (
    <div className="flex w-fit justify-center space-x-4 mt-4 p-1 bg-black/70 text-white rounded-full">
      <TooltipProvider>
        {fieldTypes.map(({ type, label, Icon }) => (
          <Tooltip key={type}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-2"
                onClick={() => onAddField(type)}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
