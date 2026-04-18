import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t } from '../services/translations';
import { Language } from '../services/translations';

import './Dashboard.css';

const Dashboard: React.FC = () => {
  const history = useHistory();

  const { lang, setLang } = useContext(AppContext) as {
    lang: Language;
    setLang: (l: Language) => void;
  };

  type KeyType = 'learn' | 'quiz' | 'chat' | 'detector' | 'progress' | 'emergency';

  const items: { key: KeyType; image: string; className: string; path: string }[] = [
    { key: "learn", image: "/assets/learn.png", className: "learn-card", path: "/learn" },
    { key: "quiz", image: "/assets/quiz.png", className: "quiz-card", path: "/quiz" },
    { key: "chat", image: "/assets/chat.png", className: "chat-card", path: "/simulator" },
    { key: "detector", image: "/assets/detector.png", className: "detector-card", path: "/detector" },
    { key: "progress", image: "/assets/progress.png", className: "progress-card", path: "/progress" },
    { key: "emergency", image: "/assets/emergency.png", className: "emergency-card", path: "/emergency" }
  ];

  return (
    <IonPage>
      <IonContent className="dashboard-content">

        {/* 🌐 Language Switch */}
       <div className="lang-selector">
  <button
    className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
    onClick={() => setLang('en')}
  >
    ENG
  </button>

  <button
    className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
    onClick={() => setLang('hi')}
  >
    हिंदी
  </button>

  <button
    className={`lang-btn ${lang === 'mr' ? 'active' : ''}`}
    onClick={() => setLang('mr')}
  >
    मराठी
  </button>
</div>

      
       {/* 🏠 Logo + Title */}
<div className="header">
  <img src="/assets/logo.png" className="app-logo" />

  <div>
    <h1 className="dashboard-title">
      Digital Aadhaar
    </h1>

    <p className="dashboard-subtitle">
      Learn. Practice. Stay Safe.
    </p>
  </div>
</div>
        {/* 🔘 Cards */}
        {items.map((item, i) => (
          <IonCard
            key={i}
            button
            className={`card ${item.className}`}
            onClick={() => history.push(item.path)}
          >
            <IonCardContent className="card-content">
              <img src={item.image} className="card-icon" />
             <span>{t[lang][item.key]}</span>
            </IonCardContent>
          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default Dashboard;