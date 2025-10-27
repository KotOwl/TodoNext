
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCg6i6eIPoiEvM7-rfAzwIqRegZ1vla9eU",
  authDomain: "todos-next-96e5c.firebaseapp.com",
  projectId: "todos-next-96e5c",
  storageBucket: "todos-next-96e5c.appspot.com",
  messagingSenderId: "114939044623",
  appId: "1:114939044623:web:10ed08bb5cb7b23039547a",
  measurementId: "G-0RYV3ZPLQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
