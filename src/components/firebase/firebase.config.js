
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCll4I0VsPfjfX_buAIUcEAUDwoJ5I3xto",
  authDomain: "user-email-password-auth-2c6d8.firebaseapp.com",
  projectId: "user-email-password-auth-2c6d8",
  storageBucket: "user-email-password-auth-2c6d8.appspot.com",
  messagingSenderId: "237234535565",
  appId: "1:237234535565:web:2127d454c76b4484e036c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app;
const auth = getAuth(app);

export default auth;