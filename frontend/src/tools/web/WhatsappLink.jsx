import { useState } from 'react';

export default function WhatsappLink() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const clean = phone.replace(/[^0-9]/g, '');
  const url = clean ? `https://wa.me/${clean}${message ? '?text=' + encodeURIComponent(message) : ''}` : '';

  const copy = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-5">
      <div>
        <label className="label">Phone Number (with country code)</label>
        <input className="input-field" placeholder="+92 300 1234567 or 923001234567" value={phone} onChange={e => setPhone(e.target.value)} />
        <p className="text-xs text-gray-400 mt-1">Include country code. Pakistan: +92, India: +91, US: +1</p>
      </div>
      <div>
        <label className="label">Pre-filled Message (optional)</label>
        <textarea className="input-field h-24 resize-none" placeholder="Hello! I found your contact on…" value={message} onChange={e => setMessage(e.target.value)} />
      </div>
      {url && (
        <div className="space-y-3">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2">Generated WhatsApp Link</p>
            <p className="text-sm font-mono text-green-700 dark:text-green-400 break-all">{url}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={copy} className={`btn-gold px-5 py-2.5 ${copied ? '!bg-green-500' : ''}`}>
              {copied ? '✓ Copied!' : '📋 Copy Link'}
            </button>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2.5">
              💬 Open WhatsApp
            </a>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2">QR Code for this link</p>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`}
              alt="QR Code" className="rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
