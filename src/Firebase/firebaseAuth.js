
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { query, collection, onSnapshot } from 'firebase/firestore'
import { doc, deleteDoc } from "firebase/firestore";
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
    getDocs,
    where,
    addDoc,
    setDoc,
    updateDoc,
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
                questions: [],
                upvotes: 0,
                downvotes: 0
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
        questions: [],
        upvotes: 0,
        downvotes: 0
      });
      console.log("Successful sign in")
    } catch (err) {
      throw err
    }
  };


  const sendQuestion = async(title, body, email, id, questions, tags, userpersonaltags, usertags) => {
    try {
      await addDoc(collection(db, "Questions"), {
        Title: title,
        Body: body,
        Author: email,
        email: email,
        answers: [],
        upvotes: 0,
        downvotes: 0
        //tags: usertags
      })
      .then((docid) => {
        const updateref = doc(db,"Users",id)
        updateDoc(updateref,{
        questions: [...questions, docid],
        //tags: [...new Set([...userpersonaltags, usertags])]
      })
      // .then(() => {
      //    tags.forEach(tag => {
      //      updateDoc(db,"Tags",tag.id,{
      //        [tag.questions]: [...tag.questions, {id: docid}]
      //      })
      //    })
      //   })
       })
       console.log("Successful Addition of Question")
       }
      
      
    catch (err) {
      throw err
    }
    // try{
    //   const updateref = doc(db,"Users",id)
    //   await setDoc(updateref,{
    //     questions: [...questions, {
    //       Title: title,
    //       Body: body,
    //       answers: []}]
    //   })
    // } catch (err) {
    //   throw err
    // }
    }

    const sendAnswer = async(answers,answer, questionid, email) => {
      try {
        const updaterefanswer = doc(db,"Questions",questionid)
        await updateDoc(updaterefanswer,{
          answers: [...answers, {body: answer, email: email, upvotes: 0, downvotes: 0} ]
        })
        console.log("Successful Addition of Answer")
      } catch (err) {
        throw err
      }
    }


    const changeUserUpvotes = async(id, upvote) => {
      console.log("Change User upvotes", upvote)
      const updateref = doc(db,"Users",id)
      await updateDoc(updateref,{
      upvotes: upvote+1
    })
    }

    const changeUserDownvotes = async(id, downvotes) => {
      console.log("User downvotes called", downvotes)
      const updateref = doc(db,"Users",id)
      await updateDoc(updateref,{
      downvotes : downvotes-1
    })
  }

    const changeQuestionUpvotes = async(id, upvotes) => {
      console.log("Change question upvotes")
      const updateref = doc(db,"Questions",id)
      await updateDoc(updateref,{
      upvotes: upvotes+1
      })
    }


    const changeQuestionDownvotes = async(id, downvotes) => {
      console.log("Change question downvotes")
      const updateref = doc(db,"Questions",id)
      await updateDoc(updateref,{
      downvotes: downvotes-1
      })
    }

    const changeAnswers = async(id, answers) => {
      console.log("Answer called", answers)
      const updateref = doc(db, "Questions",id)
      await updateDoc(updateref,{
        answers: answers
      })
    }

    const deleteQuestionFromDB = async(qid, uid, questions) => {
      console.log("Delete question called")
      await deleteDoc(doc(db, "Questions", qid));
      const updateref = doc(db,"Users",uid)
      await updateDoc(updateref,{
      questions: questions
    })
    }

  // const sendPasswordReset = async (email) => {
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     alert("Password reset link sent!");
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };
  const  logout = async() => {
    await signOut(auth);
    console.log("Logout")
  };
  export {
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    sendQuestion,
    sendAnswer,
    changeQuestionDownvotes,
    changeQuestionUpvotes,
    changeUserDownvotes,
    changeUserUpvotes,
    changeAnswers,
    deleteQuestionFromDB
  };
  

  
  