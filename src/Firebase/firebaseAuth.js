import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";
import{
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from "firebase/firestore"

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
  const db = getFirestore(app);
  console.log(db)

  
  const signInWithGoogle = async() => {
      try{
          const googleAuth = new GoogleAuthProvider()
          const res = await signInWithPopup(auth, googleAuth);
          console.log("Google sign in")
          const user = res.user;
          const myQuery = await query(collection(db, "Users"), where("uid", "==", user.uid));
          const docs = await getDocs(myQuery);
          if(docs.docs.length === 0){
            await addDoc(collection(db, "Users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
              });
          }
        return res;
      }
      catch(err){
        return err
      }
  }

const logInWithEmailAndPassword = async (email, password) => {
    try {
      console.log("Login")
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Successful login')
    } catch (err) {
      throw err
    }
  };
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user)
      await addDoc(collection(db, "Users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      console.log("Successful sign in")
    } catch (err) {
      throw err
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const  logout = async() => {
    await signOut(auth);
    console.log("Logout")
  };
  export {
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };
  

  