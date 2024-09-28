import React from 'react';
import { Input } from '~/components/ui/input';

interface FileInputProps {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FileInput: React.FC<FileInputProps> = ({ label, name, onChange }) => (
  <div className="field">
    <label htmlFor={name} className="label">
      {label}
    </label>
    <Input
      id={name}
      name={name}
      type="file"
      onChange={onChange}
      className="input"
    />
  </div>
);
