import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage, uploadBytes , ref } from "firebase/storage";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

 
const firebaseConfig = {
    apiKey: "AIzaSyAS85fUWejQT3P-Prujcz7G5GnmUvedG-c",
    authDomain: "slack-clone-4ef8c.firebaseapp.com",
    projectId: "slack-clone-4ef8c",
    storageBucket: "slack-clone-4ef8c.appspot.com",
    messagingSenderId: "570453287766",
    appId: "1:570453287766:web:bfb3b6e914fb7d18d0ecf7"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  export { auth, provider}
  export default db;