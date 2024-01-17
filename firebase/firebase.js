// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRgpfNVI7W0nubPDybXSdKhv1tOP4Z6YI",
  authDomain: "todo-firebase-app-d4991.firebaseapp.com",
  projectId: "todo-firebase-app-d4991",
  storageBucket: "todo-firebase-app-d4991.appspot.com",
  messagingSenderId: "37565692265",
  appId: "1:37565692265:web:c777d4d520ab1d9f7f25f8",
  measurementId: "G-VMFZJMCMB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);