import React from 'react';
import FormField from '../common/FormField';

interface TextFieldProps {
  text: string;
  onChange: (text: string) => void;
}

export default function TextField({ text, onChange }: TextFieldProps) {
  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your text message"
        rows={6}
        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}