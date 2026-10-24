import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA0YMU8UJ4wYrwwWxMknAqIa15gVExuxfQ",
  authDomain: "marketplace-5ed8c.firebaseapp.com",
  projectId: "marketplace-5ed8c",
  storageBucket: "marketplace-5ed8c.firebasestorage.app",
  messagingSenderId: "602485179632",
  appId: "1:602485179632:web:6526c9bf7500e8ee112e35"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);