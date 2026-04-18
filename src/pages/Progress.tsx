import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonProgressBar
} from '@ionic/react';

import { useState, useEffect } from 'react';

// 🔥 Firebase
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';

const Progress: React.FC = () => {
  const [score, setScore] = useState(0);
const { lang, speak } = useContext(AppContext) as {
  lang: Language;
  speak: (text: string) => void;
};
  // 🔥 Fetch quiz results from Firebase
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "quizResults")
        );

        let totalScore = 0;
        let totalAttempts = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const percentage = (data.score / data.total) * 100;

          totalScore += percentage;
          totalAttempts++;
        });

        if (totalAttempts > 0) {
          const avgScore = totalScore / totalAttempts;
          setScore(Math.round(avgScore));
        }

      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, []);

  // 🎨 Color based on score
  const getColor = () => {
    if (score < 30) return "danger";
    if (score < 70) return "warning";
    return "success";
  };

  // 🚨 Risk Level
  const getRiskLevel = () => {
    if (score < 30) return "High Risk ⚠️";
    if (score < 70) return "Medium Risk ⚡";
    return "Low Risk ✅";
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h1 style={{ textAlign: 'center' }}>📊 Progress</h1>

        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>

            <h2>Safety Score</h2>

            <h1 style={{ fontSize: "40px" }}>
              {score}%
            </h1>

            <IonProgressBar
              value={score / 100}
              color={getColor()}
            />

            {/* 🚨 Risk Level */}
            <h3 style={{ marginTop: '15px' }}>
              {getRiskLevel()}
            </h3>

          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Progress;