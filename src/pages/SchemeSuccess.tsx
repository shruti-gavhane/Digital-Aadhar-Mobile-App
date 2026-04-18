import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton
} from "@ionic/react";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Language } from "../services/translations";

const SchemeSuccess: React.FC = () => {

  const { lang, speak } = useContext(AppContext) as {
    lang: Language;
    speak: (text: string) => void;
  };

  return (
    <IonPage>
      <IonContent className="success-page">

        <IonCard>
          <IonCardContent>

            <h2>✅ Application Submitted</h2>

            <p>
              Your application has been successfully submitted. This is just for practice.
              For formal application, visit the official website.
            </p>

            {/* 🔥 NEW BUTTON */}
            <IonButton
              expand="block"
              style={{ marginTop: "15px" }}
              onClick={() =>
                window.open(
                  "https://web.umang.gov.in/landing/department/pmvvy.html",
                  "_blank"
                )
              }
            >
              🌐 Visit Official Site
            </IonButton>

          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default SchemeSuccess;