import React, { memo } from 'react';
import { VCardData } from '../types';

interface VCardFormProps {
  data: VCardData;
  onChange: (data: VCardData) => void;
}

const FormField = memo(({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '' 
}: { 
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div className="relative">
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
      className="absolute left-2 -top-2.5 px-1 text-xs text-gray-600 transition-all 
                bg-white peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-4 
                peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-indigo-600"
    >
      {label}
    </label>
  </div>
));

FormField.displayName = 'FormField';

const FormSection = memo(({ 
  title, 
  children 
}: { 
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-gray-700 pb-2 border-b">{title}</h3>
    {children}
  </div>
));

FormSection.displayName = 'FormSection';

function VCardForm({ data, onChange }: VCardFormProps) {
  const handleFieldChange = (field: keyof VCardData) => (value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField 
            label="First Name" 
            value={data.firstName}
            onChange={handleFieldChange('firstName')}
            placeholder="John"
          />
          <FormField 
            label="Last Name" 
            value={data.lastName}
            onChange={handleFieldChange('lastName')}
            placeholder="Doe"
          />
        </div>
      </FormSection>

      <FormSection title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField 
            label="Mobile" 
            value={data.mobile}
            onChange={handleFieldChange('mobile')}
            type="tel"
            placeholder="+1 234 567 890"
          />
          <FormField 
            label="Phone" 
            value={data.phone}
            onChange={handleFieldChange('phone')}
            type="tel"
            placeholder="+1 234 567 890"
          />
          <FormField 
            label="Work Phone" 
            value={data.workPhone}
            onChange={handleFieldChange('workPhone')}
            type="tel"
            placeholder="+1 234 567 890"
          />
          <FormField 
            label="Fax" 
            value={data.fax}
            onChange={handleFieldChange('fax')}
            type="tel"
            placeholder="+1 234 567 890"
          />
          <div className="md:col-span-2">
            <FormField 
              label="Email Address" 
              value={data.email}
              onChange={handleFieldChange('email')}
              type="email" 
              placeholder="john.doe@example.com"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Professional Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField 
            label="Company Name" 
            value={data.company}
            onChange={handleFieldChange('company')}
            placeholder="Company Inc."
          />
          <FormField 
            label="Job Title" 
            value={data.jobTitle}
            onChange={handleFieldChange('jobTitle')}
            placeholder="Senior Developer"
          />
        </div>
      </FormSection>

      <FormSection title="Address">
        <div className="grid grid-cols-1 gap-6">
          <FormField 
            label="Street Address" 
            value={data.street}
            onChange={handleFieldChange('street')}
            placeholder="123 Business Street"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="City" 
              value={data.city}
              onChange={handleFieldChange('city')}
              placeholder="New York"
            />
            <FormField 
              label="ZIP / Postal Code" 
              value={data.zip}
              onChange={handleFieldChange('zip')}
              placeholder="10001"
            />
            <FormField 
              label="State / Province" 
              value={data.state}
              onChange={handleFieldChange('state')}
              placeholder="NY"
            />
            <FormField 
              label="Country" 
              value={data.country}
              onChange={handleFieldChange('country')}
              placeholder="United States"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Website">
        <FormField 
          label="Website URL" 
          value={data.website}
          onChange={handleFieldChange('website')}
          type="url" 
          placeholder="https://example.com"
        />
      </FormSection>
    </div>
  );
}

export default memo(VCardForm);