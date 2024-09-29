"use client";

import React, { useEffect, useState } from "react";
import FormViewer from "~/components/viewer";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { type FormConfig } from "../../../components/viewer/index";

const FormPage: React.FC = () => {
  const params = useParams();
  const slug = params.id as string;
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, error: fetchError } = api.form.getFormData.useQuery({
    formId: parseInt(slug),
  });

  useEffect(() => {
    if (data) {
      setFormConfig(data);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-white">
      {error && <div className="text-red-500">{error}</div>}
      {formConfig ? (
        <FormViewer formConfig={formConfig} />
      ) : (
        <div>Loading form...</div>
      )}
    </div>
  );
};

export default FormPage;
