import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';

import './GovtCategories.css';

const GovtCategories: React.FC = () => {
  const history = useHistory();

  const { lang, speak } = useContext(AppContext) as {
    lang: Language;
    speak: (text: string) => void;
  };

  const categories = [
    { name: "Senior Citizens", icon: "👴", slug: "senior" },
    { name: "Students", icon: "🎓", slug: "student" },
    { name: "Farmers", icon: "🚜", slug: "farmer" },
    { name: "Jobs", icon: "💼", slug: "jobs" },
    { name: "Health", icon: "❤️", slug: "health" }
  ];

  return (
    <IonPage>
      <IonContent>

        {/* 🏠 HEADER */}
        <div className="govt-header">
          <div className="govt-header-content">
            <h1 className="govt-header-title">Government Schemes</h1>
            <p className="govt-header-subtitle">Browse by category</p>
          </div>
        </div>

        {/* 📂 CATEGORY CARDS */}
        <div className="govt-content">
          {categories.map((c, i) => (
           <IonCard
  key={i}
  className={`govt-card govt-card--${c.slug}`}
  onClick={() => {
    speak(c.name);
    history.push('/govt/list', { category: c.slug }); // ✅ FIXED
  }}
>
              <IonCardContent className="govt-card-inner">
                <span className="govt-card-icon">{c.icon}</span>
                <span className="govt-card-label">{c.name}</span>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default GovtCategories;
