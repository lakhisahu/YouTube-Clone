// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp6hDI47p62Gyic8BRW_-1mByrQHE-uR0",
  authDomain: "clone-56f8c.firebaseapp.com",
  projectId: "clone-56f8c",
  storageBucket: "clone-56f8c.appspot.com",
  messagingSenderId: "457265000553",
  appId: "1:457265000553:web:134bde1b2b5cc05c22f2f8",
  measurementId: "G-M7DD3VPFGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app