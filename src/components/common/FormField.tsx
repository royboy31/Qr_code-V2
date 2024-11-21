import React, { memo } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

function FormField({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '' 
}: FormFieldProps) {
  return (
    <div className="relative mt-6">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="peer w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
        id={`field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <label
        htmlFor={`field-${label.toLowerCase().replace(/\s+/g, '-')}`}
        className="absolute z-10 left-2 -top-3 px-2 text-xs text-gray-600 transition-all 
                  bg-white peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 
                  peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
                  peer-focus:-top-3 peer-focus:left-2 peer-focus:text-xs peer-focus:text-indigo-600 
                  peer-focus:px-2"
      >
        {label}
      </label>
    </div>
  );
}

export default memo(FormField);