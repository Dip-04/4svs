import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTyn5m5GPXwCwWlBppGxukSHVnJ8Jqa04",
  authDomain: "college-doot.firebaseapp.com",
  projectId: "college-doot",
  storageBucket: "college-doot.appspot.com",
  messagingSenderId: "773224479784",
  appId: "1:773224479784:web:44d5fc8d2a79cbee8ec91d",
  measurementId: "G-ZYN0C8B20M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);





export { auth };