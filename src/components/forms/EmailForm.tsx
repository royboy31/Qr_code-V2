import React from 'react';
import { EmailData } from '../../types';
import FormField from '../common/FormField';

interface EmailFormProps {
  data: EmailData;
  onChange: (data: EmailData) => void;
}

export default function EmailForm({ data, onChange }: EmailFormProps) {
  const handleChange = (field: keyof EmailData) => (value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Email Address"
        value={data.email}
        onChange={handleChange('email')}
        type="email"
        placeholder="recipient@example.com"
      />
      <FormField
        label="Subject"
        value={data.subject}
        onChange={handleChange('subject')}
        placeholder="Email subject"
      />
      <div className="relative">
        <textarea
          value={data.body}
          onChange={(e) => handleChange('body')(e.target.value)}
          placeholder="Email body"
          rows={4}
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}