import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodista-5c400.firebaseapp.com",
  projectId: "foodista-5c400",
  storageBucket: "foodista-5c400.firebasestorage.app",
  messagingSenderId: "1096734376390",
  appId: "1:1096734376390:web:ce6fa71a8bb61e16f332c7"
};

// Initialize Firebase
//iss app k through wo sari cheez hm kr skte jo firebase k through krani hai 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth}