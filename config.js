import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn7bPxzi6Egm-wFVcef3koxjnd8FDMlCs",
  authDomain: "portfoliomanagement-27995.firebaseapp.com",
  projectId: "portfoliomanagement-27995",
  storageBucket: "portfoliomanagement-27995.appspot.com",
  messagingSenderId: "494539408115",
  appId: "1:494539408115:web:8229daabb5075906b9ad86",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
