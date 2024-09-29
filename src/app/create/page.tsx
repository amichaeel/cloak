import React from "react";
import FormBuilder from "~/components/builders/form";

export default function CreateForm() {
  return (
    <div className="flex h-full justify-center bg-white">
      <div className="w-full max-w-2xl p-4">
        <FormBuilder />
      </div>
    </div>
  );
}

