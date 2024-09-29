import React from 'react';
import { Switch } from '~/components/ui/switch';

interface SwitchInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const SwitchInput: React.FC<SwitchInputProps> = ({ label, name, checked, onChange }) => (
  <div className="field">
    <label className="label">
      <Switch
        id={name}
        checked={checked}
        onCheckedChange={onChange}
        className="switch"
      />
      {label}
    </label>
  </div>
);
