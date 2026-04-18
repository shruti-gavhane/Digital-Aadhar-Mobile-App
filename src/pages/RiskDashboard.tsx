import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';
const RiskDashboard: React.FC = () => {
  const context = useContext(UserContext);
const { lang, speak } = useContext(AppContext) as {
  lang: Language;
  speak: (text: string) => void;
};
if (!context) {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>No Data Available</h2>
      </IonContent>
    </IonPage>
  );
}

const { riskScore } = context;
  const getColor = () => {
    if (riskScore < 20) return "green";
    if (riskScore < 50) return "orange";
    return "red";
  };


  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h1>Progress</h1>

        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>
            <h2>Risk Score</h2>

            <h1 style={{ color: getColor(), fontSize: '40px' }}>
              {riskScore}
            </h1>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default RiskDashboard;