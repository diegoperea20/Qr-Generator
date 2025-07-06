"use client";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode.react";
import Link from "next/link";

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState("");
  const qrRef = useRef(null);

  const handleGenerate = () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    setIsGenerating(true);
    setQrGenerated(true);
    setIsGenerating(false);
  };

  // Convertir canvas a imagen cuando se genera el QR
  useEffect(() => {
    if (qrGenerated && qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        // Convert canvas to image URL
        const imageUrl = canvas.toDataURL("image/png");
        setQrImageUrl(imageUrl);
      }
    }
  }, [qrGenerated, url]);

  const handleDownload = async () => {
    if (!qrImageUrl) return;

    setIsDownloading(true);
    try {
      // Create a temporary canvas for better quality
      const tempCanvas = document.createElement("canvas");
      const ctx = tempCanvas.getContext("2d");
      tempCanvas.width = 512; // Higher resolution
      tempCanvas.height = 512;

      // Load the QR image
      const img = new Image();
      img.onload = () => {
        // Scale the canvas for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, 512, 512);

        // Convert to blob for better handling
        tempCanvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `qr-code-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setIsDownloading(false);
          },
          "image/png",
          1.0
        );
      };
      img.src = qrImageUrl;
    } catch (error) {
      console.error("Error downloading:", error);
      setIsDownloading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const handleClear = () => {
    setUrl("");
    setQrGenerated(false);
    setQrImageUrl("");
  };

  return (
    <div className="qr-generator">
      <div className="header">
        <h1 className="title">
          <span className="title-icon">🔗</span>
          QR Generator
        </h1>
        <p className="subtitle">Create custom QR codes quickly and easily</p>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com"
            className="url-input"
            aria-label="URL to generate QR code"
          />
          <div className="input-actions">
            {url && (
              <button
                onClick={handleClear}
                className="clear-btn"
                aria-label="Clear URL"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!url.trim() || isGenerating}
          className={`generate-btn ${isGenerating ? "generating" : ""}`}
        >
          {isGenerating ? (
            <>
              <span className="spinner"></span>
              Generating...
            </>
          ) : (
            <>
              <span className="btn-icon">⚡</span>
              Generate QR
            </>
          )}
        </button>
      </div>

      {qrGenerated && (
        <div className="qr-preview">
          <div className="qr-card">
            <div className="qr-header">
              <h3>Your QR Code</h3>
              <div className="qr-actions">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`download-btn ${
                    isDownloading ? "downloading" : ""
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <span className="spinner"></span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">💾</span>
                      Download PNG
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="qr-code-container" ref={qrRef}>
              {/* Hidden canvas to generate the QR */}
              <div style={{ display: "none" }}>
                <QRCode
                  value={url}
                  size={256}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </div>

              {/* Real image that can be dragged */}
              {qrImageUrl && (
                <img
                  src={qrImageUrl}
                  alt="Generated QR Code"
                  className="qr-image"
                  draggable="true"
                  width="256"
                  height="256"
                />
              )}
            </div>

            <div className="qr-info">
              <p className="url-display">{url}</p>
              <p className="qr-tip">
                💡 You can drag this image to your desktop or click "Download
                PNG"
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="project-github">
        <p>This project is on GitHub</p>
        <Link
          href="https://github.com/diegoperea20/Qr-Generator"
          className="github-link"
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/96/github.png"
            alt="GitHub"
            className="github-icon"
          />
          <span>View on GitHub</span>
        </Link>
      </div>
    </div>
  );
};

export default QRGenerator;
