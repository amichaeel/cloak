import React from 'react';
import FormViewer from '../../components/viewer';

// Import or fetch your JSON data
const formConfig = {
  "title": "Shellhacks",
  "description": "Rate your shellhacks experience",
  "fields": [
    {
      "id": "1727587434891",
      "type": "text",
      "question": "Balls?",
      "props": {
        "id": "1727587434891",
        "name": "text_1",
        "required": true,
        "label": "Text"
      }
    },
    {
      "id": "1727587440863",
      "type": "textarea",
      "question": "Balls?",
      "props": {
        "id": "1727587440863",
        "name": "textarea_2",
        "required": false,
        "label": "TextLong"
      }
    },
    {
      "id": "1727587454403",
      "type": "number",
      "question": "Balls?",
      "props": {
        "id": "1727587454403",
        "name": "number_3",
        "required": false,
        "label": "Number"
      }
    },
    {
      "id": "1727587460550",
      "type": "checkbox",
      "question": "Balls?",
      "props": {
        "id": "1727587460550",
        "name": "checkbox_4",
        "required": false,
        "options": [
          {
            "id": "1727587460550",
            "label": "Option 1",
            "value": "option1"
          },
          {
            "id": "1727587466996",
            "label": "Option 2",
            "value": "option2"
          },
          {
            "id": "1727587470179",
            "label": "balls",
            "value": "option3"
          },
          {
            "id": "1727587473684",
            "label": "penis",
            "value": "option4"
          }
        ],
        "selectedOptions": [],
        "label": "Checkbox"
      }
    },
    {
      "id": "1727587485927",
      "type": "slider",
      "question": "Balls?",
      "props": {
        "id": "1727587485927",
        "name": "slider_5",
        "required": false,
        "question": "Balls?",
        "label": "Slider"
      }
    },
    {
      "id": "1727587492728",
      "type": "select",
      "question": "Balls?",
      "props": {
        "id": "1727587492728",
        "name": "select_6",
        "question": "Balls?",
        "required": false,
        "options": [
          {
            "id": "1727587492728",
            "label": "Option 1",
            "value": "option1"
          }
        ],
        "selectedOptions": [],
        "label": "Select (Radio)"
      }
    },
    {
      "id": "1727587525186",
      "type": "dropdown",
      "question": "Balls?",
      "props": {
        "id": "1727587525186",
        "name": "dropdown_7",
        "required": true,
        "options": [
          {
            "id": "1727587525186",
            "label": "First",
            "value": "option1"
          },
          {
            "id": "1727587541708",
            "label": "Second",
            "value": "option2"
          },
          {
            "id": "1727587545577",
            "label": "Third",
            "value": "option3"
          }
        ],
        "selectedOptions": [],
        "label": "Dropdown"
      }
    }
  ]
}

const FormPage: React.FC = () => {
  return <FormViewer formConfig={formConfig} />;
};

export default FormPage;