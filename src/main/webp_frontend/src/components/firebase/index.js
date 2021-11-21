import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVJTb5-1O38DoSmd31b5VBxfw5WcAcI60",
    authDomain: "cmpg323project2-df9ba.firebaseapp.com",
    projectId: "cmpg323project2-df9ba",
    storageBucket: "cmpg323project2-df9ba.appspot.com",
    messagingSenderId: "339037423210",
    appId: "1:339037423210:web:3eb10556c5d27caff4ac13"
};




// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}