import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEQyokho5TLlcMjjwiMcLXnqBYgUkigxk",
  authDomain: "prayer-request-app-d5879.firebaseapp.com",
  projectId: "prayer-request-app-d5879",
  storageBucket: "prayer-request-app-d5879.firebasestorage.app",
  messagingSenderId: "541720378525",
  appId: "1:541720378525:web:c1b26478c7cb165d386874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);