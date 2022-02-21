import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAfOyVkixMuyXGuNvsNW-0vCfKoaoKAlDU",
  authDomain: "tablecrud999.firebaseapp.com",
  projectId: "tablecrud999",
  storageBucket: "tablecrud999.appspot.com",
  messagingSenderId: "888290762563",
  appId: "1:888290762563:web:0f9a0c545fc1a0a3c119f6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)