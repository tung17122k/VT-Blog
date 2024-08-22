import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBikvUTFNJMfWVmrkbUbxb9yM_RFCE562c",
  authDomain: "vt-blog-f34dc.firebaseapp.com",
  projectId: "vt-blog-f34dc",
  storageBucket: "vt-blog-f34dc.appspot.com",
  messagingSenderId: "624300448813",
  appId: "1:624300448813:web:27c4bb1b5c33d77803eca4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
