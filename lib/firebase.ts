import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArB691imj2YAqFXafEaiFpaIxNFeTwkco",
  authDomain: "aibuilderscamp.firebaseapp.com",
  projectId: "aibuilderscamp",
  storageBucket: "aibuilderscamp.firebasestorage.app",
  messagingSenderId: "433148503606",
  appId: "1:433148503606:web:dbfc03030d3ee46ddd1a97",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

export const REGISTERED_KEY = "aibc_registered";
