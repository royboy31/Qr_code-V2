import React from 'react';
import { SMSData } from '../../types';
import FormField from '../common/FormField';

interface SMSFormProps {
  data: SMSData;
  onChange: (data: SMSData) => void;
}

export default function SMSForm({ data, onChange }: SMSFormProps) {
  const handleChange = (field: keyof SMSData) => (value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Phone Number"
        value={data.phone}
        onChange={handleChange('phone')}
        type="tel"
        placeholder="+1 234 567 890"
      />
      <div className="relative">
        <textarea
          value={data.message}
          onChange={(e) => handleChange('message')(e.target.value)}
          placeholder="Message text"
          rows={4}
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}