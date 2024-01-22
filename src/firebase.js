// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6p2bHz2a092daI1vjEA4qlfGvQW40J-Y1",
  authDomain: "react-webapp-firebase.firebaseapp.com",
  projectId: "react-webapp-firebase",
  storageBucket: "react-webapp-firebase.appspot.com",
  messagingSenderId: "9131347063971",
  appId: "1:913134706397:web:5ba137d3e4340c9c5405341",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
