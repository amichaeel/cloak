"use client";

import React, { useState, useEffect } from 'react';
import FormViewer from '~/components/viewer';
import type { FormConfig } from '~/components/viewer';
import { useParams } from 'next/navigation';

const FormPage: React.FC = () => {
  const params = useParams();
  const slug = params.id as string;
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <div className='text-white'>Form ID: {slug}</div>
      {error && <div className='text-red-500'>{error}</div>}
      {formConfig ? (
        <FormViewer formConfig={formConfig} />
      ) : (
        <div>Loading form...</div>
      )}
    </div>
  );
};

export default FormPage;