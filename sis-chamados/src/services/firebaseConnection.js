import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB2fUFdBjrvNekCciK4GKLyfmvv5B00j3A",
  authDomain: "db-chamados.firebaseapp.com",
  projectId: "db-chamados",
  storageBucket: "db-chamados.firebasestorage.app",
  messagingSenderId: "872102355894",
  appId: "1:872102355894:web:05ccdb6e9ce9e46f121717",
  measurementId: "G-5DNB58DT09"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//const storage = getStorage(firebaseApp);

export {auth, db};