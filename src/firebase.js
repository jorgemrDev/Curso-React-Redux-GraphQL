import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyDReJBfbAC9Xsr5XAQZW6gKVPKRbNcBL30",
  authDomain: "todo-db0ca.firebaseapp.com",
  projectId: "todo-db0ca",
  storageBucket: "todo-db0ca.appspot.com",
  messagingSenderId: "297609012126",
  appId: "1:297609012126:web:1e243b5ba26ac3fbe62c8f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function LoginWithGugul() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
}
