"use client"
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Link from 'next/link';

const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerate = () => {
    if (url) {
      setQrGenerated(true);
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr-generator">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter the URL"
      />
      <button onClick={handleGenerate}>Generate</button>
      
      {qrGenerated && (
        <div className="qr-preview">
          <div className="qr-code-container">
            <QRCode id="qr-code" value={url} size={256} level="H" />
          </div>
          <button onClick={handleDownload}>Download QR</button>
        </div>
      )}

    <div className="project-github">
      <p>This project is in </p>
      <Link href="https://github.com/diegoperea20">
        <img width="96" height="96" src="https://img.icons8.com/fluency/96/github.png" alt="github"/>
      </Link>
    </div>
      
    </div>
  );
};

export default QRGenerator;