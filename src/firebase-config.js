import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDLhPj1KvK3bEFtDKzpqSOqs9gaUTCHlGk",
  authDomain: "tables-3a431.firebaseapp.com",
  projectId: "tables-3a431",
  storageBucket: "tables-3a431.appspot.com",
  messagingSenderId: "438353592617",
  appId: "1:438353592617:web:619fa14f2bc1af35343738"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)