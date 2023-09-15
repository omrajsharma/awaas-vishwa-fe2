// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_hFINJVRQ9zFDBulsZrl0KYANkvXRggw",
  authDomain: "awaas-vishwa-51984.firebaseapp.com",
  projectId: "awaas-vishwa-51984",
  storageBucket: "awaas-vishwa-51984.appspot.com",
  messagingSenderId: "139847534393",
  appId: "1:139847534393:web:3fbd734f3af71be5864ae8",
  measurementId: "G-W95HVPQ8NP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);