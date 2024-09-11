import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl3QOQ59IXXsqrH5FW303vJfiNRX1a8A0",

  authDomain: "fetan-32aac.firebaseapp.com",

  projectId: "fetan-32aac",

  storageBucket: "fetan-32aac.appspot.com",

  messagingSenderId: "845610492799",

  appId: "1:845610492799:web:46ce0bb6ccc7d79ee2f04a",

  measurementId: "G-7W8G0XJGFB",
};

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
