import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAntZM6USgGkIJiiLLbmlAKI_JLfZfygzk",
  authDomain: "curso-react-c6c49.firebaseapp.com",
  projectId: "curso-react-c6c49",
  storageBucket: "curso-react-c6c49.firebasestorage.app",
  messagingSenderId: "812861229628",
  appId: "1:812861229628:web:b026c396585289c91b9139",
  measurementId: "G-7Z936ZPRBY"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db};