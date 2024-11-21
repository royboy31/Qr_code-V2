import React from 'react';

interface URLFormProps {
  url: string;
  onUrlChange: (url: string) => void;
}

export default function URLForm({ url, onUrlChange }: URLFormProps) {
  return (
    <div className="relative">
      <input
        type="url"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Enter website URL"
        className="peer w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent"
        id="website-url"
      />
      <label
        htmlFor="website-url"
        className="absolute z-10 left-2 -top-2.5 px-2 text-xs text-gray-600 transition-all 
                  bg-white peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 
                  peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
                  peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-indigo-600 
                  peer-focus:px-2"
      >
        Website URL
      </label>
    </div>
  );
}