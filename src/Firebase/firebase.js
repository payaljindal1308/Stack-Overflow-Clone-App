import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoD_gI344FAhODlP5B6Ns48uwqp8689s0",
    authDomain: "stackoverflow-594fd.firebaseapp.com",
    projectId: "stackoverflow-594fd",
    storageBucket: "stackoverflow-594fd.appspot.com",
    messagingSenderId: "901061332887",
    appId: "1:901061332887:web:4940c3b9b33019a638bed2",
    measurementId: "G-6GEV0M9M2V"
  };




  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);