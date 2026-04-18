import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent
} from '@ionic/react';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';

import './Learn.css'; // 🔥 CSS file

const Learn: React.FC = () => {
  const history = useHistory();

  const { lang, speak } = useContext(AppContext) as {
    lang?: Language;
    speak: (text: string) => void;
  };

  if (!lang || !t[lang]) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <h2>Loading...</h2>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="learn-content">

        {/* 🏠 HEADER */}
       <div className="header">
  <img src="/assets/logo.png" className="app-logo" />

  <div className="header-text">
    <div className="page-title">
      {t[lang].learn}
    </div>
  </div>
</div>

        {/* 📘 UPI */}
        <IonCard
          className="upi-card"
          onClick={() => {
            speak(t[lang].upi);
            history.push('/upi');
          }}
        >
          <IonCardContent className="card-content">
            <img src="/assets/upi.png" className="card-icon" />
            <span>{t[lang].upi}</span>
          </IonCardContent>
        </IonCard>

        {/* 🏛 GOVT */}
        <IonCard
          className="govt-card"
          onClick={() => {
            speak(t[lang].govt);
            history.push('/govt');
          }}
        >
          <IonCardContent className="card-content">
            <img src="/assets/govt.png" className="card-icon" />
            <span>{t[lang].govt}</span>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Learn;