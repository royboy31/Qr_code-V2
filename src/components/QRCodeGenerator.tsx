import React, { useState, useCallback } from 'react';
import { QrCode } from 'lucide-react';
import TypeSelector from './TypeSelector';
import URLForm from './URLForm';
import VCardForm from './VCardForm';
import EmailForm from './forms/EmailForm';
import SMSForm from './forms/SMSForm';
import TextField from './forms/TextField';
import WiFiForm from './forms/WiFiForm';
import QRCodeDisplay from './QRCodeDisplay';
import { VCardData, EmailData, SMSData, WiFiData, QRCodeType } from '../types';
import { generateQRCode } from '../utils/qrCode';

export default function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRCodeType>('url');
  const [url, setUrl] = useState('');
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: '', lastName: '', mobile: '', phone: '', workPhone: '', fax: '',
    email: '', company: '', jobTitle: '', street: '', city: '', zip: '',
    state: '', country: '', website: ''
  });
  const [emailData, setEmailData] = useState<EmailData>({
    email: '', subject: '', body: ''
  });
  const [smsData, setSmsData] = useState<SMSData>({
    phone: '', message: ''
  });
  const [text, setText] = useState('');
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '', password: '', encryption: 'WPA', hidden: false
  });
  const [qrCodeData, setQrCodeData] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTypeChange = useCallback((type: QRCodeType) => {
    setQrType(type);
    setError('');
    setQrCodeData('');
  }, []);

  const handleGenerate = useCallback(async () => {
    if (isGenerating) return;

    setError('');
    setIsGenerating(true);
    
    try {
      const data = await generateQRCode(qrType, {
        url, vcardData, emailData, smsData, text, wifiData
      });
      setQrCodeData(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      setQrCodeData('');
    } finally {
      setIsGenerating(false);
    }
  }, [qrType, url, vcardData, emailData, smsData, text, wifiData, isGenerating]);

  const renderForm = () => {
    switch (qrType) {
      case 'url':
        return <URLForm url={url} onUrlChange={setUrl} />;
      case 'vcard':
        return <VCardForm data={vcardData} onChange={setVcardData} />;
      case 'email':
        return <EmailForm data={emailData} onChange={setEmailData} />;
      case 'sms':
        return <SMSForm data={smsData} onChange={setSmsData} />;
      case 'text':
        return <TextField text={text} onChange={setText} />;
      case 'wifi':
        return <WiFiForm data={wifiData} onChange={setWifiData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QR Code Generator</h1>
          <p className="text-lg text-gray-600">Generate QR codes for websites, business cards, and more</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <TypeSelector qrType={qrType} onTypeChange={handleTypeChange} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="overflow-y-auto max-h-[600px] pr-4">
              {renderForm()}

              {error && (
                <p className="mt-2 text-red-600 text-sm">{error}</p>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`mt-6 w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white transition-colors duration-200`}
              >
                <QrCode size={20} />
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </button>
            </div>

            <QRCodeDisplay qrCodeData={qrCodeData} />
          </div>
        </div>
      </div>
    </div>
  );
}