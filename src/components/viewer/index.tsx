// src/components/FormViewer.tsx

"use client";

import React, { useState } from "react";
import { TextInput } from "~/components/fields/input";
import { TextArea } from "~/components/fields/textarea";
import { NumberInput } from "~/components/fields/number";
import { CheckboxInput } from "~/components/fields/checkbox";
import { SliderInput } from "~/components/fields/slider";
import { SelectInput } from "~/components/fields/select";
import { DropdownInput } from "~/components/fields/dropdown";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface FieldConfig {
  id: string;
  type: string;
  props: {
    id: string;
    name: string;
    required: boolean;
    label: string;
    options?: Option[];
    selectedOptions?: string[];
  };
}

interface FormConfig {
  title: string;
  description: string;
  fields: FieldConfig[];
}

type FormDataType = Record<string, string | number | string[] | undefined | number[]>;

const FormViewer: React.FC<{ formConfig: FormConfig }> = ({ formConfig }) => {
  const [formData, setFormData] = useState<FormDataType>({});

  const handleInputChange = (name: string, value: string | number | string[]) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderField = (field: FieldConfig) => {
    const { type, props } = field;
    const { id, name, required, label, options } = props;

    const fieldWrapper = (component: React.ReactNode) => (
      <div key={id} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{props.label}</h3>
        {component}
      </div>
    );

    switch (type) {
      case "text":
        return fieldWrapper(
          <TextInput
            label={label}
            name={name}
            value={formData[name] as string || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(name, e.target.value)}
            required={required}
          />
        );
      case "textarea":
        return fieldWrapper(
          <TextArea
            label={label}
            name={name}
            value={formData[name] as string || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(name, e.target.value)}
            required={required}
          />
        );
      case "number":
        return fieldWrapper(
          <NumberInput
            label={label}
            name={name}
            value={formData[name] as number || 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(name, Number(e.target.value))}
            required={required}
          />
        );
      case "checkbox":
        return fieldWrapper(
          <CheckboxInput
            label={label}
            name={name}
            values={formData[name] as string[] || []}
            options={options ?? []}
            onChange={(values: string[]) => handleInputChange(name, values)}
            required={required}
          />
        );
      case "slider":
        return fieldWrapper(
          <SliderInput
            label={label}
            name={name}
            value={formData[name] as number || 0}
            onChange={(value: number[]) => handleInputChange(name, value[0] ?? 0)}
            required={required}
          />
        );
      case "select":
        return fieldWrapper(
          <SelectInput
            label={label}
            name={name}
            value={formData[name] as string || ""}
            options={options ?? []}
            onChange={(value: string) => handleInputChange(name, value)}
            required={required}
          />
        );
      case "dropdown":
        return fieldWrapper(
          <DropdownInput
            label={label}
            name={name}
            values={formData[name] as string[] || []}
            options={options ?? []}
            onChange={(values: string[]) => handleInputChange(name, values)}
            required={required}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{formConfig.title}</h1>
      <p className="mb-6">{formConfig.description}</p>
      <form onSubmit={handleSubmit}>
        {formConfig.fields.map((field) => renderField(field))}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormViewer;
