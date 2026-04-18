import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonToast
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';

const UPITraining: React.FC = () => {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(10);
  const [scenario, setScenario] = useState(1);

  // ✅ Toast State
  const [toast, setToast] = useState({
    show: false,
    message: '',
    color: 'success'
  });

  // 🎤 Voice Guidance
  const speak = (text: string) => {
    try {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-IN";
      window.speechSynthesis.speak(speech);
    } catch {}
  };

  useEffect(() => {
    if (step === 0) speak("Scan QR to make payment");
    if (step === 2) speak("You received a request. Be careful.");
  }, [step]);

  // ⏳ Timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const scanQR = () => {
    setStep(1);
    speak("Enter amount and pay");
  };

const sendMoney = () => {
  const amt = Number(amount);

  if (!amount || isNaN(amt) || amt <= 0) {
    setToast({
      show: true,
      message: "Enter valid amount",
      color: "warning"
    });
    return;
  }

  if (amt > balance) {
    setToast({
      show: true,
      message: "Insufficient balance",
      color: "danger"
    });
    return;
  }
  
  setBalance(prev => prev - amt);
  setStep(2);
  setTimer(10);
};
  // ✅ UPDATED (NO ALERT)
  const handleRequest = (accept: boolean) => {
    if (accept) {
      setToast({
        show: true,
        message: "❌ Scam! You lost money.",
        color: "danger"
      });
    } else {
      setToast({
        show: true,
        message: "✅ Correct! You avoided a scam.",
        color: "success"
      });
    }

    setScenario(prev => prev + 1);
    setStep(3);
  };

  const nextScenario = () => {
    setStep(0);
    setAmount('');
    setTimer(10);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h1 style={{ fontSize: '26px', fontWeight: 'bold' }}>
          💳 UPI Training
        </h1>

        {/* Balance */}
        <IonCard>
          <IonCardContent>
            <h2>Balance: ₹{balance}</h2>
          </IonCardContent>
        </IonCard>

        {/* STEP 0 */}
        {step === 0 && (
          <>
            <h3>Scan QR to Pay</h3>

            <IonCard style={{ textAlign: 'center' }}>
              <IonCardContent>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UPI"
                  alt="QR"
                />
              </IonCardContent>
            </IonCard>

            <IonButton expand="block" onClick={scanQR}>
              Scan QR
            </IonButton>
          </>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3>Pay to Ram</h3>

            <IonInput
              placeholder="₹ Enter amount"
              type="number"
              value={amount}
              onIonChange={(e) => setAmount(e.detail.value || '')}
            />

            <IonButton expand="block" onClick={sendMoney}>
              Pay Now
            </IonButton>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3 style={{ color: 'red' }}>⚠️ Suspicious Request</h3>

            <p>
              {scenario === 1
                ? "Receive ₹1000 reward"
                : "Account will be blocked! Pay ₹500"}
            </p>

            <h2>⏳ {timer}s</h2>

            <IonButton color="danger" expand="block" onClick={() => handleRequest(true)}>
              Approve
            </IonButton>

            <IonButton color="success" expand="block" onClick={() => handleRequest(false)}>
              Reject
            </IonButton>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <IonCard>
              <IonCardContent>
                <h2>🎯 Lesson</h2>
                <p>
                  Scammers use urgency and rewards.
                  Never approve unknown requests.
                </p>
              </IonCardContent>
            </IonCard>

            <IonButton expand="block" onClick={nextScenario}>
              Next Scenario
            </IonButton>
          </>
        )}

        {/* ✅ TOAST (VERY IMPORTANT) */}
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

export default UPITraining;