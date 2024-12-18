// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


// console.log(process.env.REACT_APP_FIREBASE_API_KEY);
// console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
// console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
// console.log("Database URL:", process.env.REACT_APP_FIREBASE_DATABASE_URL);
// console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
// console.log("Storage Bucket:", process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
// console.log("Messaging Sender ID:", process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);
// console.log("App ID:", process.env.REACT_APP_FIREBASE_APP_ID);

const firebase = {
  apiKey: 'AIzaSyBEQyokho5TLlcMjjwiMcLXnqBYgUkigxk',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebase);
export const auth = getAuth(app);