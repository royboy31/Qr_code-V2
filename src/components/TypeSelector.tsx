import React from 'react';
import { Link, UserSquare2, Mail, MessageSquare, Type, Wifi } from 'lucide-react';
import { QRCodeType } from '../types';

interface TypeSelectorProps {
  qrType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

const types = [
  { id: 'url', icon: Link, label: 'Website URL' },
  { id: 'vcard', icon: UserSquare2, label: 'Business Card' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'sms', icon: MessageSquare, label: 'SMS' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'wifi', icon: Wifi, label: 'WiFi' },
] as const;

export default function TypeSelector({ qrType, onTypeChange }: TypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {types.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTypeChange(id as QRCodeType)}
          className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all ${
            qrType === id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Icon size={24} />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}