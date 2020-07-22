import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBmmC5gPnxmjOFrdeGBTsYtGIqLmRpjul8",
    authDomain: "calculator-bd162.firebaseapp.com",
    projectId: "calculator-bd162",
  };
  firebase.initializeApp(config);
  export const db = firebase.firestore();