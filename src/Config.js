import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA_i-exiGG_0yseNQQb0K2Tcb-OgkrFs8U",
  authDomain: "profile-project-f99c3.firebaseapp.com",
  projectId: "profile-project-f99c3",
  storageBucket: "profile-project-f99c3.appspot.com",
  messagingSenderId: "131163684810",
  appId: "1:131163684810:web:1876b889c758b454a51933"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app);

export { app, auth, db };
