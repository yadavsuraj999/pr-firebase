import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsR0LsmE0wSWo1QWYbuOx59byTiyuqwfA",
  authDomain: "pr-fire-base.firebaseapp.com",
  projectId: "pr-fire-base",
  storageBucket: "pr-fire-base.firebasestorage.app",
  messagingSenderId: "261423635950",
  appId: "1:261423635950:web:e22b94874539dd2764c2ff"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)