import React from 'react';
import FormViewer from '../../components/viewer';

// Import or fetch your JSON data
const formConfig = {
  "title": "mamahuevo",
  "description": "some shit",
  "fields": [
    {
      "id": "1727612742166",
      "type": "select",
      "props": {
        "id": "1727612742166",
        "name": "select_1",
        "required": true,
        "options": [
          {
            "id": "1727612742166",
            "label": "Option 1",
            "value": "option1"
          }
        ],
        "selectedOptions": [

        ],
        "label": "how gay"
      }
    },
    {
      "id": "1727612765984",
      "type": "number",
      "props": {
        "id": "1727612765984",
        "name": "number_2",
        "required": true,
        "label": "favorite food"
      }
    }
  ]
}

const FormPage: React.FC = () => {
  return <FormViewer formConfig={formConfig} />;
};

export default FormPage;