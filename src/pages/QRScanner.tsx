import {
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/react';

import { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { analyzeQR } from '../services/qrService';
import { IonIcon } from '@ionic/react';
import { cameraOutline, imageOutline } from 'ionicons/icons';
import '../styles/qr.css';

const QRScanner: React.FC = () => {

  const [scannedUrl, setScannedUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 📸 Camera Scan
  const startQRScan = async () => {
    const scanner = new Html5Qrcode("reader");

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          setScannedUrl(decodedText);
          await scanner.stop();
          handleAnalyze(decodedText);
        },
        () => {}
      );
    } catch (err) {
      alert("Camera error");
    }
  };

  // 🖼 Image Scan
  const scanFromImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const scanner = new Html5Qrcode("reader");

      try {
        const decoded = await scanner.scanFile(file, true);
        setScannedUrl(decoded);
        handleAnalyze(decoded);
      } catch {
        alert("No QR found");
      }
    };

    input.click();
  };

  // 🔍 Analyze
  const handleAnalyze = async (url: string) => {
    setLoading(true);
    const res = await analyzeQR(url);
    setResult(res);
    setLoading(false);
  };

    return (
  <IonCard className="qr-card">
    <IonCardContent>

      {/* Header */}
      <div className="qr-header">
        <span className="qr-icon">📷</span>
        <h2>Scan QR Code</h2>
      </div>

      {/* Buttons */}
      <IonButton className="qr-btn primary" expand="block" onClick={startQRScan}>
  <IonIcon icon={cameraOutline} slot="start" />
  Scan with Camera
</IonButton>

<IonButton className="qr-btn secondary" expand="block" onClick={scanFromImage}>
  <IonIcon icon={imageOutline} slot="start" />
  Upload QR Image
</IonButton>

      {/* Scanner */}
      <div id="reader" className="qr-reader"></div>

      {/* Loading */}
      {loading && <p className="qr-loading">🔍 Analyzing QR...</p>}

      {/* Result */}
      {result && (
        <div className={`qr-result ${result.safe ? "safe-box" : "scam-box"}`}>
          <h3>
            {result.safe ? "✅ Safe QR" : "❌ Scam QR"}
          </h3>
          <p>{result.message}</p>
        </div>
      )}

    </IonCardContent>
  </IonCard>
);
};

export default QRScanner;