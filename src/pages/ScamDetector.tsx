import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonToast,
  IonIcon
} from "@ionic/react";
import { useState, useContext } from "react";
import Tesseract from "tesseract.js";
import { detectScam } from "../services/aiService";
import { AppContext } from "../context/AppContext";
import { Language } from "../services/translations";
import QRScanner from "./QRScanner";

import { searchOutline, imageOutline } from "ionicons/icons";

import "./ScamDetector.css";

const ScamDetector: React.FC = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const { lang, speak } = useContext(AppContext) as {
    lang: Language;
    speak: (text: string) => void;
  };

  const [toast, setToast] = useState({
    show: false,
    message: "",
    color: "primary"
  });

  const handleDetect = async () => {
    if (!message) {
      setToast({
        show: true,
        message: "Please enter a message",
        color: "warning"
      });
      return;
    }

    setLoading(true);

    try {
      const res = await detectScam(message);

      if (!res) {
        setResult("⚠️ No response");
        setToast({
          show: true,
          message: "No response from AI",
          color: "warning"
        });
      } else {
        setResult(res);

        setToast({
          show: true,
          message: "Analysis complete",
          color: "success"
        });
      }
    } catch {
      setResult("⚠️ Error analyzing message");

      setToast({
        show: true,
        message: "Error analyzing message",
        color: "danger"
      });
    }

    setLoading(false);
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const {
        data: { text }
      } = await Tesseract.recognize(file, "eng");

      setMessage(text);

      const res = await detectScam(text);
      setResult(res || "⚠️ No response");

      setToast({
        show: true,
        message: "Image analyzed successfully",
        color: "success"
      });
    } catch {
      setToast({
        show: true,
        message: "Image processing failed",
        color: "danger"
      });
    }

    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent className="page custom-content">

        {/* Header */}
        <div className="ai-header">
          <h1>🤖 AI Scam Detector</h1>
          <p className="subtitle">Detect suspicious messages instantly</p>
        </div>

        {/* Input Card */}
        <IonCard className="ai-card">
          <IonCardContent>

            <textarea
              className="ai-input"
              placeholder="Paste suspicious message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <IonButton
              expand="block"
              className="ai-btn primary"
              onClick={handleDetect}
            >
              <IonIcon icon={searchOutline} slot="start" />
              Analyze Message
            </IonButton>

            {/* File Upload Styled */}
            <label className="file-label">
              <IonIcon icon={imageOutline} />
              Upload Image
              <input type="file" onChange={handleImageUpload} hidden />
            </label>

            {/* Loading */}
            {loading && (
              <div className="loading-box">
                <IonSpinner name="crescent" />
                <p>Analyzing with AI...</p>
              </div>
            )}

          </IonCardContent>
        </IonCard>

        {/* Result */}
        {result && (
          <IonCard className="ai-card">
            <IonCardContent>

              <div
                className={`ai-result ${
                  result.toLowerCase().includes("scam")
                    ? "scam-box"
                    : "safe-box"
                }`}
              >
                <h3>
                  {result.toLowerCase().includes("scam")
                    ? "❌ Scam Detected"
                    : "✅ Looks Safe"}
                </h3>

                <p>{result}</p>
              </div>

            </IonCardContent>
          </IonCard>
        )}

        {/* QR Scanner */}
        <QRScanner />

        {/* Toast */}
        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={2000}
          color={toast.color}
          onDidDismiss={() => setToast({ ...toast, show: false })}
        />

      </IonContent>
    </IonPage>
  );
};

export default ScamDetector;