import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonToast
} from '@ionic/react';
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import "./Login.css";
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  // ✅ Toast state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    color: 'success'
  });

  const handleLogin = async () => {
    // ✅ Validation
    if (!email || !password) {
      setToast({
        show: true,
        message: "Please enter email and password",
        color: "warning"
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Success toast
      setToast({
        show: true,
        message: "Login Successful!",
        color: "success"
      });

      // 👉 Navigate after delay
      setTimeout(() => {
        history.push('/home');
      }, 1200);

    } catch (error: any) {
      // ❌ Error toast
      setToast({
        show: true,
        message: error.message || "Login failed",
        color: "danger"
      });
    }
  };

  return (
    <IonPage>
  <IonContent className="login-page">

    <div className="login-container">

      {/* Title */}
     <div className="login-header">
  <h2 className="login-title">🔐 Welcome Back</h2>
  <p className="login-subtitle">Login to continue</p>
</div>
      {/* Form Card */}
      <div className="login-card">

        <IonInput
          className="login-input"
          placeholder="Enter Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />

        <IonInput
          className="login-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />

        <IonButton
          expand="block"
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </IonButton>

      </div>

      {/* Register */}
      <div className="login-footer">
        <p>New user?</p>
        <span onClick={() => history.push('/register')}>
          Register
        </span>
      </div>

    </div>

    {/* TOAST */}
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

export default Login;