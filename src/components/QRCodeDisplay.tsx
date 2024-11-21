import React from 'react';
import { QrCode, Download } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeData: string;
}

export default function QRCodeDisplay({ qrCodeData }: QRCodeDisplayProps) {
  const downloadQRCode = () => {
    if (!qrCodeData) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeData;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
      {qrCodeData ? (
        <>
          <img src={qrCodeData} alt="QR Code" className="w-64 h-64" />
          <button
            onClick={downloadQRCode}
            className="mt-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <Download size={20} />
            Download QR Code
          </button>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <QrCode size={64} className="mx-auto mb-4 opacity-50" />
          <p>Your QR code will appear here</p>
        </div>
      )}
    </div>
  );
}