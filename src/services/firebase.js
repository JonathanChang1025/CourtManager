import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyAeBnm7qSX6wm3dKnQcnhFtD_R21_0yEg8",
    authDomain: "court-manager-d0156.firebaseapp.com",
    databaseURL: "https://court-manager-d0156-default-rtdb.firebaseio.com",
    projectId: "court-manager-d0156",
    storageBucket: "court-manager-d0156.appspot.com",
    messagingSenderId: "124154371176",
    appId: "1:124154371176:web:420fbd821ef9335d13efdd",
    measurementId: "G-Z9HPDM9RNS"
};

firebase.initializeApp(firebaseConfig);

export default firebase;