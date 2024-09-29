
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHuoUeSk6fFQWctanfnUIENRwq-CVFQEE",
    authDomain: "login-e94b5.firebaseapp.com",
    projectId: "login-e94b5",
    storageBucket: "login-e94b5.appspot.com",
    messagingSenderId: "395679328867",
    appId: "1:395679328867:web:8518c8f85d4aa36a6a2656",
    measurementId: "G-RX5SJBJ8GP"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
