import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonToast
} from '@ionic/react';

import { useState } from 'react';

// Firebase
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import './Quiz.css';

// QUESTIONS (same as your file)
const questions = [
  {
    question: "You received ₹5000 reward. Click link to claim.",
    options: ["Click the link", "Ignore the message"],
    correct: 1,
    explanation: "Never click unknown links. This is a common scam.",
    level: "easy"
  },
  {
    question: "Bank asks for OTP to verify account.",
    options: ["Share OTP", "Do not share"],
    correct: 1,
    explanation: "Banks NEVER ask for OTP.",
    level: "easy"
  },
  {
    question: "Unknown person sends money request.",
    options: ["Accept request", "Reject request"],
    correct: 1,
    explanation: "Accepting request means YOU send money.",
    level: "easy"
  },
  {
    question: "QR code shown to receive money.",
    options: ["Scan QR", "Do not scan"],
    correct: 1,
    explanation: "Scanning QR sends money.",
    level: "medium"
  },
  {
    question: "Email asks urgent password reset.",
    options: ["Click link", "Open bank app"],
    correct: 1,
    explanation: "Phishing attack.",
    level: "medium"
  },
  {
    question: "SIM blocked warning call.",
    options: ["Follow instructions", "Verify officially"],
    correct: 1,
    explanation: "Scammers create urgency.",
    level: "medium"
  },
  {
    question: "Fake investment doubles money.",
    options: ["Invest", "Avoid"],
    correct: 1,
    explanation: "Too good = scam.",
    level: "hard"
  },
  {
    question: "App asks SMS permission.",
    options: ["Allow", "Deny"],
    correct: 1,
    explanation: "SMS access can expose OTP.",
    level: "hard"
  },
  {
    question: "Lottery message received.",
    options: ["Claim prize", "Ignore"],
    correct: 1,
    explanation: "Unexpected rewards = scam.",
    level: "hard"
  }
];

const Quiz: React.FC = () => {
  const [level, setLevel] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: '',
    color: 'primary'
  });

  const filteredQuestions = questions.filter(q => q.level === level);

  const saveResultToFirebase = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "users", user.uid, "quizResults"), {
        level,
        score,
        total: filteredQuestions.length,
        createdAt: new Date()
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = (index: number) => {
    const isCorrect = index === filteredQuestions[current].correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setToast({ show: true, message: "✅ Correct!", color: "success" });
    } else {
      setToast({ show: true, message: "❌ Wrong choice!", color: "danger" });
    }

    setTimeout(() => {
      setToast({
        show: true,
        message: filteredQuestions[current].explanation,
        color: "medium"
      });
    }, 1200);

    if (current + 1 < filteredQuestions.length) {
      setTimeout(() => setCurrent(current + 1), 2500);
    } else {
      setTimeout(() => {
        setShowResult(true);
        saveResultToFirebase();
      }, 2500);
    }
  };

  return (
    <IonPage>
      <IonContent className="page custom-content">

        <h1 className="title">Scam Awareness Quiz</h1>

        {/* LEVEL SELECT */}
        {!level ? (
          <>
            <h2 className="center">Select Level</h2>

<IonButton className="btn easy-btn" expand="block" onClick={() => setLevel("easy")}>
  Easy
</IonButton>

<IonButton className="btn medium-btn" expand="block" onClick={() => setLevel("medium")}>
  Medium
</IonButton>

<IonButton className="btn hard-btn" expand="block" onClick={() => setLevel("hard")}>
  Hard
</IonButton>
          </>
        ) : !showResult ? (
          <>
            {/* Scenario count */}
            <div className="scenario-text">
              Question {current + 1} of {filteredQuestions.length}
            </div>

            {/* Question card */}
            <IonCard className="message-card fade-in">
              <IonCardContent className="message-text">
                {filteredQuestions[current].question}
              </IonCardContent>
            </IonCard>

            {/* Options */}
            {filteredQuestions[current].options.map((opt, i) => (
              <IonButton
                key={i}
                expand="block"
                className="btn"
                color={i === 0 ? "danger" : "success"}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </IonButton>
            ))}
          </>
        ) : (
          <>
            {/* Result */}
            <IonCard className="result-card fade-in">
              <IonCardContent>
                <h2 className="score">
                  Score: {score} / {filteredQuestions.length}
                </h2>
              </IonCardContent>
            </IonCard>

            <IonButton
              className="next-btn"
              expand="block"
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setShowResult(false);
                setLevel(null);
              }}
            >
              Restart Quiz
            </IonButton>
          </>
        )}

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

export default Quiz;