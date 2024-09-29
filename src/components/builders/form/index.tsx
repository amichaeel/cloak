"use client";

import React, { useState } from "react";
import { TextInput } from "~/components/fields/input";
import { TextArea } from "~/components/fields/textarea";
import { NumberInput } from "~/components/fields/number";
import { FieldSelector } from "~/components/fields/fieldselector";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Switch } from "~/components/ui/switch";
import { CheckboxInput } from "~/components/fields/checkbox";
import { SliderInput } from "~/components/fields/slider";
import { SelectInput } from "~/components/fields/select";
import { DropdownInput } from "~/components/fields/dropdown";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import type { Option } from "~/types/option";

export interface FieldConfig {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

interface FormData {
  title: string;
  description: string;
  fields: FieldConfig[];
}

const FormBuilder: React.FC = () => {
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [formDescription, setFormDescription] = useState<string>("");
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [formOutput, setFormOutput] = useState<FormData | null>(null);

  const formSubmitMutation = api.form.submit.useMutation();
  const handleSubmit = async () => {
    const currentFormData: FormData = {
      title: formTitle,
      description: formDescription,
      fields: fields,
    };

    try {
      const result = formSubmitMutation.mutate(currentFormData);
      setFormOutput(currentFormData);
      console.log("Form saved successfully:", result);
      // You can add a success message or redirect the user here
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error submitting form:", err.message);
        // You can show an error message to the user here
      } else {
        console.error("Unknown error:", err);
      }
      // Set formOutput to null or an error object here to indicate failure
    }
  };

  const addField = (type: string) => {
    const id = Date.now().toString();
    const baseProps = {
      id,
      name: `${type}_${fields.length + 1}`,
      required: false,
    };

    let specificProps = {};

    // Initialize specific props for date input
    if (type === "date") {
      specificProps = {
        value: undefined,
        onChange: (date: Date | undefined) => {
          updateFieldProps(id, { value: date });
        },
      };
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
          updateFieldProps(id, { options });
        },
      };
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
    };

    setFields([...fields, newField]);
  };

  const updateFieldProps = (id: string, newProps: object) => {
    setFields((prevFields: FieldConfig[]) =>
      prevFields.map((field: FieldConfig) =>
        field.id === id
          ? { ...field, props: { ...field.props, ...newProps } }
          : field,
      ),
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="form-builder space-y-6 text-white">
      <div className="rounded-xl border-neutral-400 bg-neutral-800 p-4 shadow-xl">
        {/* Form Title */}
        <div className="mb-4">
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Form Title"
            className="w-full rounded-lg border-neutral-300 bg-neutral-800 p-2 text-2xl font-bold focus:bg-neutral-700 focus:outline-none"
          />
        </div>

        {/* Form Description */}
        <div>
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Form Description"
            className="w-full rounded-lg bg-neutral-800 p-2 focus:bg-neutral-700 focus:outline-none"
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
              className="field-wrapper rounded-lg bg-neutral-800 p-4 shadow-xl"
            >
              <TextInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="mt-2 flex items-center justify-between">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        } else if (field.type === "textarea") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 rounded-lg bg-neutral-800 p-4 shadow-xl"
            >
              <TextArea
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="mt-2 flex items-center justify-between">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        } else if (field.type === "number") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 rounded-lg bg-neutral-800 p-4 shadow-lg"
            >
              <NumberInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="flex items-center justify-between px-2">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        } else if (field.type === "checkbox") {
          return (
            <div
              key={field.id}
              className="field-wrapper rounded-lg bg-neutral-800 p-4 shadow-xl"
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
              <div className="mt-2 flex items-center justify-between">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        } else if (field.type === "slider") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 rounded-lg bg-neutral-800 p-4 shadow-xl"
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
              <div className="mt-2 flex items-center justify-between">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        } else if (field.type === "select") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 rounded-lg bg-neutral-800 p-4 shadow-xl"
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
              <div className="mt-2 flex items-center justify-between">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        } else if (field.type === "dropdown") {
          return (
            <div
              key={field.id}
              className="field-wrapper mb-6 rounded-lg bg-neutral-800 p-4 shadow-xl"
            >
              <DropdownInput
                {...field.props}
                isBuilder={true}
                onLabelChange={(newLabel: string) =>
                  updateFieldProps(field.id, { label: newLabel })
                }
              />
              <div className="mt-2 flex items-center justify-between">
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
                  onClick={() => removeField(field.id)}
                >
                  <Cross1Icon />
                </Button>
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Field Selector at the Bottom */}
      <div className="flex items-center justify-center">
        <FieldSelector onAddField={addField} />
      </div>

      {/* Submit Button */}
      <div className="bg-purp flex items-center justify-center">
        <Button
          className="bg-violet-900 hover:bg-violet-800"
          onClick={() => handleSubmit()}
        >
          Submit Form
        </Button>
      </div>
    </div>
  );
};

export default FormBuilder;

