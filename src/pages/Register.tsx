import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonToast
} from '@ionic/react';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const [toast, setToast] = useState({
    show: false,
    message: '',
    color: 'success'
  });

  const handleRegister = async () => {
    if (!email || !password) {
      setToast({
        show: true,
        message: "Please fill all fields",
        color: "warning"
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setToast({
        show: true,
        message: "Registration Successful!",
        color: "success"
      });

      setTimeout(() => {
        history.push('/login');
      }, 1200);

    } catch (error: any) {
      setToast({
        show: true,
        message: error.message || "Registration failed",
        color: "danger"
      });
    }
  };

  return (
    <IonPage>
      <IonContent
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{
              color: "#33745C",
              fontWeight: "bold",
              fontFamily: "Milan, serif"
            }}>
              📝 Create Account
            </h2>

            <p style={{ color: "#33745C", fontSize: "14px" }}>
              Register to get started
            </p>
          </div>

          {/* CARD */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "2px solid #33745C",
            padding: "20px"
          }}>

            <IonInput
              placeholder="Enter Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              style={{
                marginTop: "10px",
                '--background': '#f5f7fb',
                borderRadius: "10px",
                padding: "10px"
              } as any}
            />

            <IonInput
              type="password"
              placeholder="Enter Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              style={{
                marginTop: "12px",
                '--background': '#f5f7fb',
                borderRadius: "10px",
                padding: "10px"
              } as any}
            />

            <IonButton
              expand="block"
              onClick={handleRegister}
              style={{
                marginTop: "15px",
                '--background': '#3D8CE8',
                '--color': '#ffffff',
                borderRadius: "16px",
                height: "50px",
                fontWeight: "bold"
              } as any}
            >
              Register
            </IonButton>

          </div>

          {/* FOOTER */}
          <div style={{
            marginTop: "15px",
            textAlign: "center",
            fontSize: "14px"
          }}>
            <p>Already have an account?</p>

            <span
              onClick={() => history.push('/login')}
              style={{
                color: "#33745C",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Login
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

export default Register;