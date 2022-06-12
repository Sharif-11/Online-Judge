// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCty4ki7orQUU19iqe4bidgKUntadQ6NLI",
  authDomain: "cse-326-project-91c7b.firebaseapp.com",
  projectId: "cse-326-project-91c7b",
  storageBucket: "cse-326-project-91c7b.appspot.com",
  messagingSenderId: "747786209046",
  appId: "1:747786209046:web:9729f5a219bdd683037237",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
