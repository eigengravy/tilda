import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "tilda-2c233.firebaseapp.com",
  projectId: "tilda-2c233",
  storageBucket: "tilda-2c233.appspot.com",
  messagingSenderId: "732714506085",
  appId: "1:732714506085:web:ec3f858d6a9be10644b38c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const googleProvider = new GoogleAuthProvider()
export default app