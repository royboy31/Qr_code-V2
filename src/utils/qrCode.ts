import QRCode from 'qrcode';
import { VCardData, EmailData, SMSData, WiFiData } from '../types';

interface QRCodeParams {
  url: string;
  vcardData: VCardData;
  emailData: EmailData;
  smsData: SMSData;
  text: string;
  wifiData: WiFiData;
}

const validateUrl = (url: string): string => {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    throw new Error('Please enter a URL');
  }
  
  try {
    const urlObj = new URL(trimmedUrl);
    return urlObj.toString();
  } catch {
    try {
      const urlWithProtocol = new URL(`https://${trimmedUrl}`);
      return urlWithProtocol.toString();
    } catch {
      throw new Error('Please enter a valid website URL');
    }
  }
};

const validateVCardData = (data: VCardData): void => {
  if (!data.firstName?.trim() || !data.lastName?.trim()) {
    throw new Error('Please enter both first and last name');
  }
  
  if (data.email && !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Please enter a valid email address');
  }
  
  const phoneFields = ['mobile', 'phone', 'workPhone', 'fax'];
  phoneFields.forEach(field => {
    if (data[field as keyof VCardData] && !data[field as keyof VCardData].match(/^[+\d\s-()]+$/)) {
      throw new Error(`Please enter a valid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    }
  });
};

const validateEmailData = (data: EmailData): void => {
  if (!data.email?.trim()) {
    throw new Error('Please enter an email address');
  }
  
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Please enter a valid email address');
  }
};

const validateSMSData = (data: SMSData): void => {
  if (!data.phone?.trim()) {
    throw new Error('Please enter a phone number');
  }
  
  if (!data.phone.match(/^[+\d\s-()]+$/)) {
    throw new Error('Please enter a valid phone number');
  }
};

const validateText = (text: string): void => {
  if (!text?.trim()) {
    throw new Error('Please enter some text');
  }
};

const validateWiFiData = (data: WiFiData): void => {
  if (!data.ssid?.trim()) {
    throw new Error('Please enter a network name (SSID)');
  }
  
  if (data.encryption !== 'nopass' && !data.password?.trim()) {
    throw new Error('Please enter a network password');
  }
};

const generateVCardString = (data: VCardData): string => {
  validateVCardData(data);

  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.firstName.trim()} ${data.lastName.trim()}
N:${data.lastName.trim()};${data.firstName.trim()};;;`;

  if (data.email?.trim()) {
    vcard += `\nEMAIL:${data.email.trim()}`;
  }
  
  if (data.mobile?.trim()) {
    vcard += `\nTEL;TYPE=CELL:${data.mobile.trim()}`;
  }
  
  if (data.phone?.trim()) {
    vcard += `\nTEL;TYPE=HOME:${data.phone.trim()}`;
  }
  
  if (data.workPhone?.trim()) {
    vcard += `\nTEL;TYPE=WORK:${data.workPhone.trim()}`;
  }
  
  if (data.fax?.trim()) {
    vcard += `\nTEL;TYPE=FAX:${data.fax.trim()}`;
  }
  
  if (data.company?.trim()) {
    vcard += `\nORG:${data.company.trim()}`;
  }
  
  if (data.jobTitle?.trim()) {
    vcard += `\nTITLE:${data.jobTitle.trim()}`;
  }

  const address = [
    '',
    '',
    data.street?.trim() || '',
    data.city?.trim() || '',
    data.state?.trim() || '',
    data.zip?.trim() || '',
    data.country?.trim() || ''
  ].join(';');

  if (address.replace(/;/g, '')) {
    vcard += `\nADR:${address}`;
  }

  if (data.website?.trim()) {
    vcard += `\nURL:${data.website.trim()}`;
  }

  vcard += '\nEND:VCARD';
  return vcard;
};

const generateEmailString = (data: EmailData): string => {
  validateEmailData(data);
  const subject = encodeURIComponent(data.subject || '');
  const body = encodeURIComponent(data.body || '');
  return `mailto:${data.email}?subject=${subject}&body=${body}`;
};

const generateSMSString = (data: SMSData): string => {
  validateSMSData(data);
  const message = encodeURIComponent(data.message || '');
  return `sms:${data.phone}${message ? `:${message}` : ''}`;
};

const generateWiFiString = (data: WiFiData): string => {
  validateWiFiData(data);
  const { ssid, password, encryption, hidden } = data;
  return `WIFI:T:${encryption};S:${ssid};P:${password}${hidden ? ';H:true' : ''};;`;
};

export const generateQRCode = async (
  type: 'url' | 'vcard' | 'email' | 'sms' | 'text' | 'wifi',
  params: QRCodeParams
): Promise<string> => {
  try {
    let data: string;

    switch (type) {
      case 'url':
        data = validateUrl(params.url);
        break;
      case 'vcard':
        data = generateVCardString(params.vcardData);
        break;
      case 'email':
        data = generateEmailString(params.emailData);
        break;
      case 'sms':
        data = generateSMSString(params.smsData);
        break;
      case 'text':
        validateText(params.text);
        data = params.text;
        break;
      case 'wifi':
        data = generateWiFiString(params.wifiData);
        break;
      default:
        throw new Error('Invalid QR code type');
    }

    return await QRCode.toDataURL(data, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate QR code. Please try again.');
  }
};