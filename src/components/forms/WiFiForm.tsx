import React from 'react';
import { WiFiData } from '../../types';
import FormField from '../common/FormField';

interface WiFiFormProps {
  data: WiFiData;
  onChange: (data: WiFiData) => void;
}

export default function WiFiForm({ data, onChange }: WiFiFormProps) {
  const handleChange = (field: keyof WiFiData) => (value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Network Name (SSID)"
        value={data.ssid}
        onChange={handleChange('ssid')}
        placeholder="WiFi network name"
      />
      <FormField
        label="Password"
        value={data.password}
        onChange={handleChange('password')}
        type="password"
        placeholder="WiFi password"
      />
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Security</label>
        <div className="flex gap-4">
          {(['WPA', 'WEP', 'nopass'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleChange('encryption')(type)}
              className={`px-4 py-2 rounded-lg text-sm ${
                data.encryption === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'nopass' ? 'None' : type}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.hidden}
          onChange={(e) => handleChange('hidden')(e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm text-gray-700">Hidden network</span>
      </label>
    </div>
  );
}