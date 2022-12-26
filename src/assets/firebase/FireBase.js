import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCXEpyLp7KY7o6TnCbQ2mkhyjW5ZxCNlfM",
  authDomain: "loginsocial-cd196.firebaseapp.com",
  projectId: "loginsocial-cd196",
  storageBucket: "loginsocial-cd196.appspot.com",
  messagingSenderId: "788086894154",
  appId: "1:788086894154:web:1740eedb07e7bf9cb100b3",
  measurementId: "G-GTX2F7VJGB",
};
initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
