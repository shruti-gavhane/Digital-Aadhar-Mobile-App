import { IonPage, IonContent, IonCard, IonCardContent } from "@ionic/react";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';
import CommunitySiren from "./CommunitySiren";
const Emergency: React.FC = () => {
  const { lang, speak } = useContext(AppContext) as {
  lang: Language;
  speak: (text: string) => void;
};
  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h2 style={{ color: "red" }}>🚨 I GOT SCAMMED</h2>

        <IonCard>
          <IonCardContent>
            <p>📞 Call 1930 (Cyber Helpline)</p>
            <p>🏦 Contact Bank</p>
            <p>📸 Save Evidence</p>
            <p>🌐 cybercrime.gov.in</p>
            <CommunitySiren />
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Emergency;