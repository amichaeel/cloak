// ~/components/fields/slider.tsx

import React from "react"
import { Slider } from "~/components/ui/slider"

interface SliderInputProps {
  label: string
  name: string
  value?: number
  onChange?: (value: number[]) => void
  onLabelChange?: (label: string) => void
  isBuilder?: boolean
  required?: boolean
  min?: number
  max?: number
  step?: number
  onSettingsChange?: (settings: { min: number; max: number; step: number }) => void
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  name,
  value = 0,
  onChange,
  onLabelChange,
  isBuilder = false,
  required = false,
  min = 0,
  max = 100,
  step = 1,
  onSettingsChange,
}) => {
  return (
    <div className="field mb-4">
      {isBuilder ? (
        // Editable label in form builder
        <>
          <input
            type="text"
            value={label}
            onChange={(e) => onLabelChange && onLabelChange(e.target.value)}
            placeholder="Question"
            className="label-input mb-2 block w-full border-b border-gray-300 focus:border-black focus:outline-none"
          />
          {/* Slider Settings */}
          <div className="flex space-x-2 mb-2">
            <div>
              <label className="block text-sm font-medium">Min</label>
              <input
                type="number"
                value={min}
                onChange={(e) =>
                  onSettingsChange &&
                  onSettingsChange({ min: Number(e.target.value), max, step })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Max</label>
              <input
                type="number"
                value={max}
                onChange={(e) =>
                  onSettingsChange &&
                  onSettingsChange({ min, max: Number(e.target.value), step })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Step</label>
              <input
                type="number"
                value={step}
                onChange={(e) =>
                  onSettingsChange &&
                  onSettingsChange({ min, max, step: Number(e.target.value) })
                }
                className="input w-full"
              />
            </div>
          </div>
          {/* Disabled Slider */}
          <Slider
            value={[value]}
            onValueChange={() => { }}
            min={min}
            max={max}
            step={step}
            className="slider"
            disabled
          />
        </>
      ) : (
        // End-user view
        <>
          <label className="label mb-2 block font-medium">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-center space-x-4">
            <span>{min}</span>
            <Slider
              name={name}
              value={[value]}
              onValueChange={onChange}
              min={min}
              max={max}
              step={step}
              className="slider flex-1"
            />
            <span>{max}</span>
          </div>
        </>
      )}
    </div>
  )
}
