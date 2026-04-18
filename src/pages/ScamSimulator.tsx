import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonToast
} from '@ionic/react';
import { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { generateScamMessage } from '../services/aiService';
import { AppContext } from '../context/AppContext';
import { t } from '../services/translations';
import { Language } from '../services/translations';

type Message = {
  sender: 'user' | 'scammer';
  text: string;
};

const ScamSimulator: React.FC = () => {
  
const { lang, setLang, speak } = useContext(AppContext) as {
  lang: Language;
  setLang: (l: Language) => void;
  speak: (text: string) => void;
};
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

  // ✅ Toast
  const [toast, setToast] = useState({
    show: false,
    message: '',
    color: 'warning'
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🎤 Voice Input
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setToast({
        show: true,
        message: "Voice not supported",
        color: "warning"
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang =
      lang === 'hi' ? 'hi-IN' :
      lang === 'mr' ? 'mr-IN' : 'en-IN';

    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      setToast({
        show: true,
        message: "Voice error",
        color: "danger"
      });
    };
  };

  // 🔥 Load AI scam
  useEffect(() => {
    loadScam();
  }, [lang]);

  const loadScam = async () => {
    try {
      const scam = await generateScamMessage("elderly");
      setMessages([{ sender: 'scammer', text: scam }]);
      speak(scam);
    } catch {
      setMessages([
        { sender: 'scammer', text: "⚠️ Failed to load scam" }
      ]);
    }
  };

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input) {
      setToast({
        show: true,
        message: "Enter a message",
        color: "warning"
      });
      return;
    }

    const userMsg: Message = {
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    evaluateResponse(input);
    setInput('');
  };

  const evaluateResponse = (msg: string) => {
    let feedback = '';
    let reply = '';

    if (msg.toLowerCase().includes('otp')) {
      feedback = "⚠️ Never share OTP!";
      reply = "Your account is now compromised.";
    } else if (msg.toLowerCase().includes('no')) {
      feedback = "✅ Safe response";
      reply = "Final warning!";
    } else {
      feedback = "⚠️ Risky response";
      reply = "Verify immediately!";
    }

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'scammer', text: reply }
      ]);

      speak(reply);

      setToast({
        show: true,
        message: feedback,
        color: feedback.includes("Safe") ? "success" : "danger"
      });

    }, 1000);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">

        {/* 🌍 Language Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <IonButton size="small" onClick={() => setLang('en')}>EN</IonButton>
          <IonButton size="small" onClick={() => setLang('hi')}>HI</IonButton>
          <IonButton size="small" onClick={() => setLang('mr')}>MR</IonButton>
        </div>

        <h2>{t[lang].chat}</h2>

        {/* Chat UI */}
        <div style={{ marginTop: 20 }}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                justifyContent:
                  m.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 10
              }}
            >
              <div
                style={{
                  background: m.sender === 'user' ? '#4CAF50' : '#eee',
                  color: m.sender === 'user' ? 'white' : 'black',
                  padding: 10,
                  borderRadius: 12,
                  maxWidth: '70%'
                }}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <IonInput
          placeholder="Type message..."
          value={input}
          onIonChange={(e) => setInput(e.detail.value!)}
        />

        {/* 🎤 Voice */}
        <IonButton onClick={startListening}>
          🎤 {listening ? "Listening..." : "Speak"}
        </IonButton>

        {/* Send */}
        <IonButton expand="block" onClick={sendMessage}>
          Send
        </IonButton>

        {/* ✅ Toast */}
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

export default ScamSimulator;