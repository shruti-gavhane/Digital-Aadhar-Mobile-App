import { initializeApp } from "firebase/app";

// ✅ Add these imports
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your config (same as yours)
const firebaseConfig = {
  apiKey: "paste ai api key here",
  authDomain: "digitalaadhar-845a3.firebaseapp.com",
  projectId: "digitalaadhar-845a3",
  storageBucket: "digitalaadhar-845a3.firebasestorage.app",
  messagingSenderId: "674721831141",
  appId: "1:674721831141:web:4d0691f56c24ba51a95c0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Enable Authentication
export const auth = getAuth(app);

// ✅ Enable Firestore (database)
export const db = getFirestore(app);
