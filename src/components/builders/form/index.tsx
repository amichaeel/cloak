"use client"

import React, { useState } from "react"
import { TextInput } from "~/components/fields/input"
import { TextArea } from "~/components/fields/textarea"
import { NumberInput } from "~/components/fields/number"
import { FieldSelector } from "~/components/fields/fieldselector"
import { Cross1Icon } from "@radix-ui/react-icons"
import { Switch } from "~/components/ui/switch"
import { CheckboxInput } from "~/components/fields/checkbox"
import { SliderInput } from "~/components/fields/slider"
import { SelectInput } from "~/components/fields/select"
import { DropdownInput } from "~/components/fields/dropdown"
import { Button } from "~/components/ui/button"
import type { Option } from "~/types/option"

interface FieldConfig {
  id: string
  type: string
  props: object
}


const FormBuilder: React.FC = () => {
  const [formTitle, setFormTitle] = useState<string>("Untitled Form")
  const [formDescription, setFormDescription] = useState<string>("")

  const [fields, setFields] = useState<FieldConfig[]>([])

  const addField = (type: string) => {
    const id = Date.now().toString()
    const baseProps = {
      id,
      name: `${type}_${fields.length + 1}`,
      required: false,
    }

    let specificProps = {}

    // Initialize specific props for date input
    if (type === "date") {
      specificProps = {
        value: undefined,
        onChange: (date: Date | undefined) => {
          updateFieldProps(id, { value: date })
        },
      }
    }

    if (type === "checkbox" || type === "select" || type === "dropdown") {
      specificProps = {
        options: [
          {
            id: Date.now().toString(),
            label: "Option 1",
            value: "option1",
          },
        ],
        selectedOptions: [],
        onOptionsChange: (options: Option) => {
          updateFieldProps(id, { options })
        },
      }
    }

    const newField: FieldConfig = {
      id,
      type,
      props: {
        ...baseProps,
        ...specificProps,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
          // Placeholder for onChange, not used in builder
        },
      },
    }

    setFields([...fields, newField])
  }

  const updateFieldProps = (id: string, newProps: object) => {
    setFields((prevFields: FieldConfig[]) =>
      prevFields.map((field: FieldConfig) =>
        field.id === id
          ? { ...field, props: { ...field.props, ...newProps } }
          : field
      )
    )
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  return (
    <div className="form-builder space-y-6">
      <div className="border p-2 rounded">
        {/* Form Title */}
        <div className="mb-4">
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Form Title"
            className="text-2xl font-bold w-full border-b border-gray-300 focus:border-black focus:outline-none"
          />
        </div>

        {/* Form Description */}
        <div className="mb-6">
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Form Description"
            className="w-full border-b border-gray-300 focus:border-black focus:outline-none"
            rows={2}
          />
        </div>
      </div>

      {/* Render Fields */}
      {fields.map((field: FieldConfig) => {
        if (field.type === "text") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <TextInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        } else if (field.type === "textarea") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <TextArea
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        } else if (field.type === "number") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <NumberInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        } else if (field.type === "checkbox") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <CheckboxInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
                onOptionsChange={(options) =>
                  updateFieldProps(field.id, { options })
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        } else if (field.type === "slider") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <SliderInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
                onSettingsChange={(settings) =>
                  updateFieldProps(field.id, settings)
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        } else if (field.type === "select") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <SelectInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
                onOptionsChange={(options) =>
                  updateFieldProps(field.id, { options })
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        } else if (field.type === "dropdown") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 p-4 border border-gray-300 rounded"
            >
              <DropdownInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                  <Switch
                    id={`required-${field.id}`}
                    checked={(field.props as { required: boolean }).required}
                    onCheckedChange={(checked: boolean) =>
                      updateFieldProps(field.id, { required: checked })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={() => removeField(field.id)}>
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          )
        }
        return null
      })}

      {/* Field Selector at the Bottom */}
      <div className="flex justify-center items-center">
        <FieldSelector onAddField={addField} />
      </div>
    </div>
  )
}

export default FormBuilder
