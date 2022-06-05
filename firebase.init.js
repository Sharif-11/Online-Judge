// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBR4nMECeuH7naOHsgx6dItN79kSq1v6FE",
	authDomain: "cse-326-project.firebaseapp.com",
	projectId: "cse-326-project",
	storageBucket: "cse-326-project.appspot.com",
	messagingSenderId: "750453169707",
	appId: "1:750453169707:web:808ac3b42f0d5f06a0146e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
