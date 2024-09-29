import React from 'react';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
}

export const RadioInputGroup: React.FC<RadioGroupProps> = ({ label, name, value, options, onChange }) => (
  <div className="field">
    <label className="label">{label}</label>
    <RadioGroup value={value} onValueChange={onChange}>
      {options?.map((option) => (
        <div key={option.value} className="radio-option">
          <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </RadioGroup>
  </div>
);
