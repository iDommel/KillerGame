import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqRtK20JL9ECeVYISqJP5W1OiSVR2wz5E",
  authDomain: "killer-game-hint.firebaseapp.com",
  projectId: "killer-game-hint",
  storageBucket: "killer-game-hint.appspot.com",
  messagingSenderId: "264328192783",
  appId: "1:264328192783:web:484001b7b6cc8416f9d47a",
  measurementId: "G-DGCSHZF5VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);