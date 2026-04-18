import {
  IonPage,
  IonContent,
  IonInput,
  IonCard,
  IonCardContent
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { t, Language } from "../services/translations";

import "./SchemePractice.css";

const SchemePractice: React.FC = () => {
  const history = useHistory();

  const { lang, speak } = useContext(AppContext) as {
    lang: Language;
    speak: (text: string) => void;
  };

  return (
    <IonPage>
      <IonContent className="practice-page">

        {/* Header */}
        <div className="practice-header">
          <h2>📝 Apply (Practice)</h2>
          <p>Fill details to simulate application</p>
        </div>

        {/* Form Card */}
        <IonCard className="practice-card">
          <IonCardContent>

            <IonInput className="practice-input" placeholder="Full Name" />
            <IonInput className="practice-input" placeholder="Aadhaar Number" />
            <IonInput className="practice-input" placeholder="Age" />

          </IonCardContent>
        </IonCard>

        {/* Submit (Dashboard Style Card Button) */}
        <IonCard
          className="practice-submit"
          onClick={() => history.push("/govt/success")}
        >
          <IonCardContent className="practice-submit-content">
            ✅ Submit Application
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default SchemePractice;