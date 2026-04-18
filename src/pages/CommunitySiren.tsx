import {
  IonCard,
  IonCardContent,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon,
  IonToast
} from "@ionic/react";

import { useEffect, useState } from "react";
import {
  megaphoneOutline,
  locationOutline,
  warningOutline
} from "ionicons/icons";

import {
  reportScam,
  getLatestWarnings,
  getNearbyScams
} from "../services/sirenService";

import "../styles/siren.css";

const CommunitySiren: React.FC = () => {
  const [warnings, setWarnings] = useState<any[]>([]);
  const [nearby, setNearby] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    color: "danger"
  });

  useEffect(() => {
    loadWarnings();
    detectNearbyScams();
  }, []);

  const loadWarnings = async () => {
    const data = await getLatestWarnings();
    setWarnings(data);
  };

  // 📍 DETECT NEARBY SCAMS
  const detectNearbyScams = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const nearbyData = await getNearbyScams(
          pos.coords.latitude,
          pos.coords.longitude
        );

        setNearby(nearbyData);

        if (nearbyData.length > 0) {
          setToast({
            show: true,
            message: "⚠️ Scam reported near your location!",
            color: "danger"
          });
        }
      },
      () => {}
    );
  };

  const handleReport = async () => {
    if (!title || !desc) return;

    await reportScam(title, desc);

    setTitle("");
    setDesc("");

    loadWarnings();
  };

  return (
    <div className="siren-container">

      {/* 🚨 Nearby Alert */}
      {nearby.length > 0 && (
        <IonCard className="nearby-alert">
          <IonCardContent>
            <h3>
              <IonIcon icon={warningOutline} /> Nearby Scam Alert
            </h3>

            {nearby.map((n, i) => (
              <div key={i} className="nearby-item">
                <b>{n.title}</b>
                <p>{n.description}</p>
                <small>{Math.round(n.distance)} meters away</small>
              </div>
            ))}
          </IonCardContent>
        </IonCard>
      )}

      {/* 🔥 All Alerts */}
      {warnings.map((w, i) => (
        <IonCard key={i} className="dark-alert-card">
          <IonCardContent>
            <div className="urgent-badge">URGENT ALERT</div>

            <h3>{w.title}</h3>
            <p>{w.description}</p>

            <div className="location">
              <IonIcon icon={locationOutline} />
              <span>
                {w.lat?.toFixed(2)}, {w.lng?.toFixed(2)}
              </span>
            </div>
          </IonCardContent>
        </IonCard>
      ))}

      {/* 📢 Report Section */}
      <IonCard className="report-card">
        <IonCardContent>

          <h3>📢 Report Scam</h3>

          <IonInput
            placeholder="Scam Title"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />

          <IonTextarea
            placeholder="Describe scam..."
            value={desc}
            onIonChange={(e) => setDesc(e.detail.value!)}
          />

          <IonButton expand="block" onClick={handleReport}>
            <IonIcon icon={megaphoneOutline} slot="start" />
            Broadcast Alert
          </IonButton>

        </IonCardContent>
      </IonCard>

      {/* Toast */}
      <IonToast
        isOpen={toast.show}
        message={toast.message}
        duration={2000}
        color={toast.color}
        onDidDismiss={() => setToast({ ...toast, show: false })}
      />

    </div>
  );
};

export default CommunitySiren;