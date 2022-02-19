import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCiNfK3EM-h8S3_DiTcCiBkqtZwTe1P0oQ",
  authDomain: "tablecrud-b61fc.firebaseapp.com",
  projectId: "tablecrud-b61fc",
  storageBucket: "tablecrud-b61fc.appspot.com",
  messagingSenderId: "1054224674750",
  appId: "1:1054224674750:web:1220dc319d3d75585e93ef"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)